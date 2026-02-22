const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  imdbId : String,
  title : String,
  poster: String,
  Languages: {
    type: String,
    enum : ["Hindi", "English"],
  }
})
const Movie = mongoose.model('Movie', MovieSchema);
module.exports = Movie;