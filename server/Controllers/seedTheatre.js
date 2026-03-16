
const Theatre = require('../Models/theatre');

const seedTheatre = async (req, res) => {
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
}

module.exports = {seedTheatre};