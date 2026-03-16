const Show = require('../Models/show');
const express = require('express');

const router = express.Router();

router.get('/:showId', async (req, res) => {
  try {
    const {showId} = req.params;
    const show = await Show.findById(showId).populate("theatre", "name location").populate("movie", "title");
    res.status(200).json({ show });
  } catch (error) {
    console.log('err: ', error);
    res.status(500).json({message: "Internal server error"});
  }
})

module.exports = router;