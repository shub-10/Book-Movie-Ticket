const express = require('express');
const axios = require('axios');
const router = express.Router();
const dotenv = require("dotenv")
dotenv.config({path: './.env'});



router.get('/getMovie/:id', async(req, res)=>{
    try {
        const { id } = req.params;
        const OMDB_API = process.env.OMDB_API_KEY;
        const response = await axios.get(`http://www.omdbapi.com/?i=${id}&apikey=${OMDB_API}`)
        const movie = response.data;
        res.status(200).json({message: "Movie found", Movie: movie});
    } catch (error) {
        res.status(400).json({message: "Movie not found.."})
    }
})
router.get('/getMovies', async(req, res)=>{
    try {
        const OMDB_API = process.env.OMDB_API_KEY;
        const response = await axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=${OMDB_API}&s=disney`);
        const movies = response.data;
        // console.log(movies);
        res.status(200).json({message: "fetched successfull..", Movies: movies});
    } catch (error) {
      res.status(400).json({message: "Not Found!"})
    }
})

module.exports = router;