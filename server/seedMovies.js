const axios = require('axios');
const dbConnection = require('./database/db');
const Movie = require('./Models/movie')
const seedMovies = async ()=>{
   
   const data = await axios.get("https://www.omdbapi.com/?apikey=da9eb0e6&s=deadpool");
  //  console.log(data.data);
   const movies = data.data.Search;

   for(let i = 0; i < movies.length; i++){
      const title = movies[i].Title;
      const imdbId = movies[i].imdbID;
      const poster = movies[i].Poster;

      await Movie.create({imdbId: imdbId, title: title, poster: poster});
   }

   console.log("seeding is done...");
}
dbConnection();
seedMovies();