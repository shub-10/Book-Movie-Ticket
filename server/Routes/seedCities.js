const express = require('express');
const router = express.Router();
const City = require('../Models/City');

router.get('/', async(req, res)=>{
   try {
    const cities = await City.find();
    res.status(200).json({Cities: cities})
   } catch (error) {
     console.log(error);
   }
})
router.post('/seed', async (req, res) => {
  await City.insertMany([
    { name: "Delhi", state: "Delhi" },
    { name: "Mumbai", state: "Maharashtra" },
    { name: "Gurgaon", state: "Haryana" }
  ]);

  res.send("Cities Seeded");
});

module.exports = router;