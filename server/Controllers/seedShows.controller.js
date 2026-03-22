const Theatre = require('../Models/theatre.model');
const Show = require('../Models/show.model');
const Movie = require('../Models/movie.model');
const SeedState = require("../Models/seedState.model");

const seedShows = async (req, res) => {
  try {
    const movies = await Movie.find().select('_id');
    const theatres = await Theatre.find().select('_id seatTypes');

    if (!movies.length) return res.status(400).send('Seed movies first');
    if (!theatres.length) return res.status(400).send('Seed theatres first');

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const windowEnd = new Date(today);
    windowEnd.setDate(today.getDate() + 6);
    windowEnd.setHours(23, 59, 59, 999);

    await Show.deleteMany({ showdate: { $lt: today } });

    const baseSlots = ["09:30 AM", "12:30 PM", "03:30 PM", "06:30 PM", "09:30 PM"];
    const ops = [];

    const rotateSlots = (slots, shift) => {
      const n = slots.length;
      const k = ((shift % n) + n) % n;
      return slots.slice(k).concat(slots.slice(0, k));
    };

    for (let tIndex = 0; tIndex < theatres.length; tIndex++) {
      const theatre = theatres[tIndex];

      const assignedCount = Math.min(4, movies.length);

      const assignedMovies = [];
      for (let i = 0; i < assignedCount; i++) {
        assignedMovies.push(movies[(tIndex + i) % movies.length]);
      }

      const primeMovie = assignedMovies[0];
      const regularMovies = assignedMovies.slice(1);

      for (let d = 0; d < 7; d++) {
        const showDate = new Date(today);
        showDate.setDate(today.getDate() + d);

        const daySlots = rotateSlots(baseSlots, d);
        const dayPlan = [];

        dayPlan.push({ movieId: primeMovie._id, slot: daySlots[0] });
        dayPlan.push({ movieId: primeMovie._id, slot: daySlots[1] });

        for (let i = 0; i < regularMovies.length && i + 2 < daySlots.length; i++) {
          dayPlan.push({ movieId: regularMovies[i]._id, slot: daySlots[i + 2] });
        }


        if (dayPlan.length < daySlots.length) {
          const fillerMovie = assignedMovies[d % assignedMovies.length]._id;
          dayPlan.push({ movieId: fillerMovie, slot: daySlots[daySlots.length - 1] });
        }

        for (const item of dayPlan) {
          ops.push({
            updateOne: {
              filter: {
                theatre: theatre._id,
                movie: item.movieId,
                showdate: showDate,
                showtime: item.slot
              },
              update: {
                $setOnInsert: {
                  theatre: theatre._id,
                  movie: item.movieId,
                  showdate: showDate,
                  showtime: item.slot,
                  seatTypes: (theatre.seatTypes || []).map((s) => ({
                    type: s.type,
                    price: s.price,
                    totalSeats: s.totalSeats,
                    availableSeats: s.totalSeats
                  }))
                }
              },
              upsert: true
            }
          });
        }
      }
    }

    if (ops.length) {
      await Show.bulkWrite(ops, { ordered: false });
    }
    await SeedState.findOneAndUpdate(
      { key: "shows" },
      { lastSeedStart: today },
      { upsert: true, new: true }
    );
    await Show.deleteMany({ showdate: { $gt: windowEnd } });

    const total = await Show.countDocuments({
      showdate: { $gte: today, $lte: windowEnd }
    });

    res.send(`Rolling shows updated. Window: 7 days. Total shows in window: ${total}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to maintain rolling shows');
  }
}
module.exports = { seedShows };