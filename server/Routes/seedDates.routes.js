const seedState = require('../Models/seedState.model');
const express = require('express');

const router = express.Router();

router.get('/', async(req, res)=>{
  try {
    const date = await seedState.find().select('lastSeedStart');

    res.status(200).json({message: "Fetched last seed date", seedDate:date});
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
  }
})

module.exports = router;