const express = require('express');
const { seedShows } = require('../Controllers/seedShows');
const SeedState = require("../Models/seedState");
const { getMoviesByCity, getMovieByImdbId, getMovieShowsByCityAndDate } = require('../Controllers/movies');

const router = express.Router();

const checkWindow = async () => {
  const state = await SeedState.findOne({ key: "shows" });
  const today = new Date(); today.setHours(0, 0, 0, 0);

  if (!state || (today - state.lastSeedStart) / 86400000 >= 7) {
   await seedShows();
  }
}
checkWindow();

router.get('/', getMoviesByCity);
router.get('/:imdbId', getMovieByImdbId);
router.get('/:imdbId/shows', getMovieShowsByCityAndDate);

module.exports = router;
