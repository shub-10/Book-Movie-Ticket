const Movie = require('../Models/movie.model');
const Theatre = require('../Models/theatre.model');
const Show = require('../Models/show.model');
const City = require('../Models/city.model');


const badRequest = (res, message) => {
  return res.status(400).json({ success: false, message });
};

const serverError = (res, error, message) => {
  console.error(error);
  return res.status(500).json({ success: false, message });
};



const getCityWithTheatres = async (cityName) => {
  const city = await City.findOne({ name: cityName });
  if (!city) {
    return { city: null, theatreIds: [] };
  }

  const theatres = await Theatre.find({ city: city._id }).select('_id');
  return { city, theatreIds: theatres.map((theatre) => theatre._id) };
};

const getMoviesByCity = async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) {
      return badRequest(res, 'Query param "city" is required');
    }

    const { city: cityDoc, theatreIds } = await getCityWithTheatres(city);
    if (!cityDoc) {
      return res.status(404).json({ success: false, message: 'City not found' });
    }
    if (!theatreIds.length) {
      return res.status(200).json({ success: true, message: 'No theatres found', Movies: [] });
    }

    const movieIds = await Show.distinct('movie', { theatre: { $in: theatreIds } });
    const movies = await Movie.find({ _id: { $in: movieIds } });

    return res.status(200).json({ success: true, message: 'Movies fetched', Movies: movies });
  } catch (error) {
    return serverError(res, error, 'Failed to fetch movies');
  }
};

const getMovieByImdbId = async (req, res) => {
  try {
    const { imdbId } = req.params;
    const movie = await Movie.findOne({ imdbId });

    if (!movie) {
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }

    return res.status(200).json({ success: true, message: 'Movie found', Movie: movie });
  } catch (error) {
    return serverError(res, error, 'Failed to fetch movie');
  }
};

const getMovieShowsByCityAndDate = async (req, res) => {
 try {
   const { imdbId } = req.params;
   const { city, date } = req.query;

   if (!city || !date) {
      return res.status(400).json({ message: 'city and date are required' });
    }
   const cityDetails = await City.findOne({ name: city });
 
   if (!cityDetails) return res.status(404).json({ message: 'City not found' });
 
   const cityId = cityDetails._id;
   const theatres = await Theatre.find({ city: cityId }).select('_id');
   const movieDetails = await Movie.findOne({ imdbId: imdbId });
 
   if (!movieDetails) return res.status(404).json({ message: 'Movie not found' });
 
   const movieId = movieDetails._id;
   const theatreIds = theatres.map(t => t._id);
 
   const [y, m, d] = date.split('-').map(Number);
   const start = new Date(y, m - 1, d, 0, 0, 0, 0);
   const end = new Date(y, m - 1, d, 23, 59, 59, 999);
 
   const shows = await Show.find({ movie: movieId, showdate: { $gte: start, $lte: end }, theatre: { $in: theatreIds } })
     .populate('theatre', 'name location brand').sort({ showtime: 1 });
    const availabledates = await Show.distinct('showdate', { movie: movieId, theatre: { $in: theatreIds } });
   const grouped = new Map();
 
   for (const show of shows) {
     const tid = String(show.theatre._id);
     if (!grouped.has(tid)) {
       grouped.set(tid,
        { theatre: {
           _id: show.theatre._id,
           name: show.theatre.name,
           location: show.theatre.location,
           brand: show.theatre.brand
          }, shows: []
         }
       )
     }
     grouped.get(tid).shows.push({
       _id: show._id,
       showtime: show.showtime,
       showdate: show.showdate,
       seatTypes: show.seatTypes
     });
   }
 
   return res.status(200).json({
     message: `Shows for ${movieDetails.title} on ${date} in ${city}`, theatres: Array.from(grouped.values()),availableDates: availabledates,
   })
 
 } catch (error) {
  console.error(error);
  return res.status(500).json({message: "Failed to fetch shows"});
 }

}




module.exports = {
  getMoviesByCity,
  getMovieByImdbId,
  getMovieShowsByCityAndDate,
};
