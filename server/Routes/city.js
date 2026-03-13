const express = require('express')
const City = require('../Models/city');

const router = express.Router();

router.get('/', async(req, res)=>{
    try {
      const cities = await City.find();
      res.status(200).json({Cities: cities});
    } catch (error) {
      res.status(500).json({message: error})
    }
});

module.exports = router;