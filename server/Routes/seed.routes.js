const express = require('express');
const router = express.Router();
const City = require('../Models/city.model');
const {seedShows} = require('../Controllers/seedShows.controller');
const {seedMovies} = require('../Controllers/seedMovies.controller');
const { seedTheatre } = require('../Controllers/seedTheatre.controller');


router.post('/movies', seedMovies)
router.post('/theatre', seedTheatre);
router.post('/shows', seedShows);
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

module.exports = router;