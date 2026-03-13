const express = require('express');
const router = express.Router();
const City = require('../Models/city');
const Theatre = require('../Models/theatre');
const Show = require('../Models/show');
const Movie = require('../Models/movie');

router.post('/movies', async (req, res) => {
  const data = [
    { "imdbId": "tt15398776", "title": "Oppenheimer", "poster": "https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg", "Languages": "English" },
    { "imdbId": "tt1517268", "title": "Barbie", "poster": "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg", "Languages": "English" },
    { "imdbId": "tt9603212", "title": "Mission Impossible Dead Reckoning", "poster": "https://image.tmdb.org/t/p/w500/NNxYkU70HPurnNCSiCjYAmacwm.jpg", "Languages": "English" },
    { "imdbId": "tt9362722", "title": "Spider-Man Across the Spider-Verse", "poster": "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg", "Languages": "English" },
    { "imdbId": "tt5433140", "title": "Fast X", "poster": "https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg", "Languages": "English" },

    { "imdbId": "tt15428134", "title": "Jawan", "poster": "https://image.tmdb.org/t/p/w500/8QVDXDiOGHRcAD4oM6MXjE0osSj.jpg", "Languages": "Hindi" },

    { "imdbId": "tt1745960", "title": "Top Gun Maverick", "poster": "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg", "Languages": "English" },
    { "imdbId": "tt10648342", "title": "Thor Love and Thunder", "poster": "https://image.tmdb.org/t/p/w500/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg", "Languages": "English" },
    { "imdbId": "tt10872600", "title": "Spider-Man No Way Home", "poster": "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg", "Languages": "English" },
    { "imdbId": "tt9419884", "title": "Doctor Strange Multiverse of Madness", "poster": "https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg", "Languages": "English" },
    { "imdbId": "tt1877830", "title": "The Batman", "poster": "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg", "Languages": "English" },
    { "imdbId": "tt8291224", "title": "Uri The Surgical Strike", "poster": "https://image.tmdb.org/t/p/w500/yNySAgpAnWmPpYinim9E0tUzJWG.jpg", "Languages": "Hindi" },
    { "imdbId": "tt4154796", "title": "Avengers Endgame", "poster": "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg", "Languages": "English" },
    { "imdbId": "tt0848228", "title": "The Avengers", "poster": "https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg", "Languages": "English" },
    { "imdbId": "tt0468569", "title": "The Dark Knight", "poster": "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg", "Languages": "English" },
    { "imdbId": "tt10838180", "title": "The Flash", "poster": "https://image.tmdb.org/t/p/w500/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg", "Languages": "English" },
    { "imdbId": "tt10954600", "title": "Ant-Man and the Wasp Quantumania", "poster": "https://image.tmdb.org/t/p/w500/qnqGbB22YJ7dSs4o6M7exTpNxPz.jpg", "Languages": "English" },

    { "imdbId": "tt6710474", "title": "Everything Everywhere All at Once", "poster": "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg", "Languages": "English" },
    { "imdbId": "tt2380307", "title": "Coco", "poster": "https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg", "Languages": "English" },
    { "imdbId": "tt7286456", "title": "Joker", "poster": "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg", "Languages": "English" },
    { "imdbId": "tt0816692", "title": "Interstellar", "poster": "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg", "Languages": "English" },

    { "imdbId": "tt1187043", "title": "3 Idiots", "poster": "https://image.tmdb.org/t/p/w500/66A9MqXOyVFCssoloscw79z8Tew.jpg", "Languages": "Hindi" },
    { "imdbId": "tt9362930", "title": "No Time To Die", "poster": "https://image.tmdb.org/t/p/w500/iUgygt3fscRoKWCV1d0C7FbM9TP.jpg", "Languages": "English" },
    { "imdbId": "tt1879016", "title": "Operation Fortune", "poster": "https://image.tmdb.org/t/p/w500/uo7vWfQUlVwueYTDRicXOJa8Oow.jpg", "Languages": "English" },
    { "imdbId": "tt1630029", "title": "Avatar The Way of Water", "poster": "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg", "Languages": "English" },
    { "imdbId": "tt1160419", "title": "Dune", "poster": "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg", "Languages": "English" },
    { "imdbId": "tt1877830", "title": "The Batman 2022", "poster": "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg", "Languages": "English" },
    { "imdbId": "tt6264654", "title": "Free Guy", "poster": "https://image.tmdb.org/t/p/w500/acCS12FVUQ7blkC8qEbuXbsWEs2.jpg", "Languages": "English" },
    { "imdbId": "tt5113044", "title": "Minions The Rise of Gru", "poster": "https://image.tmdb.org/t/p/w500/wKiOkZTN9lUUUNZLmtnwubZYONg.jpg", "Languages": "English" },
    { "imdbId": "tt8176054", "title": "Stree 2", "poster": "https://image.tmdb.org/t/p/w500/9MIsN3n3sAxMZyqWkldO2Zp7g9L.jpg", "Languages": "Hindi" },
    { "imdbId": "tt4430212", "title": "Drishyam 2", "poster": "https://image.tmdb.org/t/p/w500/7k8E3Wz1x1o1t4bmPqhGV8eK3op.jpg", "Languages": "Hindi" },
    { "imdbId": "tt15782600", "title": "Leo", "poster": "https://image.tmdb.org/t/p/w500/9X5Lxqzv2YfFVQxw2d3ZpV9Q6wG.jpg", "Languages": "Hindi" }

  ]
  await Movie.insertMany(data);
  res.send("movies seeded...")
})

router.post('/cities', async (req, res) => {
  const data = [
    { "name": "Delhi", "state": "Delhi" },
    { "name": "Mumbai", "state": "Maharashtra" },
    { "name": "Bengaluru", "state": "Karnataka" },
    { "name": "Hyderabad", "state": "Telangana" },
    { "name": "Chennai", "state": "Tamil Nadu" },
    { "name": "Kolkata", "state": "West Bengal" },
    { "name": "Pune", "state": "Maharashtra" },
    { "name": "Ahmedabad", "state": "Gujarat" },
    { "name": "Jaipur", "state": "Rajasthan" },
    { "name": "Lucknow", "state": "Uttar Pradesh" }
  ]
  await City.insertMany(data);

  res.send("Cities Seeded");
});
router.post('/theatre', async (req, res) => {
  try {
    const cities = await City.find();
    if (!cities.length) return res.status(400).send('Seed cities first');

    await Theatre.deleteMany({});

    const cinemas = ['PVR', 'Cinepolis', 'Miraj', 'INOX'];
    const places = ['City Centre', 'Grand Plaza', 'Phoenix Mall', 'MGF Mall'];

    const seatLayouts = [
      [
        { type: '2D', price: 200, totalSeats: 120, availableSeats: 120 },
        { type: '3D', price: 280, totalSeats: 80, availableSeats: 80 }
      ],
      [
        { type: '2D', price: 190, totalSeats: 140, availableSeats: 140 },
        { type: '3D', price: 260, totalSeats: 70, availableSeats: 70 }
      ],
      [
        { type: '2D', price: 170, totalSeats: 150, availableSeats: 150 }
      ],
      [
        { type: '2D', price: 210, totalSeats: 110, availableSeats: 110 },
        { type: '3D', price: 290, totalSeats: 70, availableSeats: 70 },
        { type: '4DX', price: 380, totalSeats: 40, availableSeats: 40 }
      ]
    ];

    const theatres = [];

    for (const city of cities) {
      for (let i = 0; i < cinemas.length; i++) {
        theatres.push({
          name: `${cinemas[i]} ${city.name} ${places[i]}`,
          location: `Sector ${Math.floor(Math.random() * 20) + 1}`,
          brand: cinemas[i],
          city: city._id,
          seatTypes: seatLayouts[i]
        });
      }
    }

    await Theatre.insertMany(theatres);
    res.send(`Seeded ${theatres.length} theatres`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to seed theatres');
  }
});


router.post('/shows', async (req, res) => {
  try {
    const movies = await Movie.find().select('_id');
    const theatres = await Theatre.find().select('_id seatTypes');

    if (!movies.length) return res.status(400).send('Seed movies first');
    if (!theatres.length) return res.status(400).send('Seed theatres first');

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // const windowEnd = new Date(today);
    // windowEnd.setDate(today.getDate() + 6);
    // windowEnd.setHours(23, 59, 59, 999);

    // // 1) delete expired shows
    // await Show.deleteMany({ showdate: { $lt: today } });

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

        // prime movie gets first 2 slots
        dayPlan.push({ movieId: primeMovie._id, slot: daySlots[0] });
        dayPlan.push({ movieId: primeMovie._id, slot: daySlots[1] });

        // regular movies get next slots (1 each)
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

    // optional safety: keep only rolling 7-day window
    await Show.deleteMany({ showdate: { $gt: windowEnd } });

    const total = await Show.countDocuments({
      showdate: { $gte: today, $lte: windowEnd }
    });

    res.send(`Rolling shows updated. Window: 7 days. Total shows in window: ${total}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to maintain rolling shows');
  }
});


module.exports = router;