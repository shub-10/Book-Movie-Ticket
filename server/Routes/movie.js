const express = require('express');
const axios = require('axios');
const dotenv = require("dotenv")
dotenv.config({path: './.env'});
const Movie = require('../Models/movie')

const router = express.Router();

router.get('/getMovie/:id', async(req, res)=>{
    try {
        const { id } = req.params;
        const movie = await Movie.find({imdbId: id});
        res.status(200).json({message: "Movie found", Movie: movie});
    } catch (error) {
        res.status(400).json({message: "Movie not found.."})
    }
})
router.get('/getMovies', async(req, res)=>{
    try {
        const movies = await Movie.find({});
        res.status(200).json({message: "fetched successfull..", Movies: movies});
    } catch (error) {
      res.status(400).json({message: "Not Found!"})
    }
})

module.exports = router;