import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
const Home = (props) => {

  const city = props.selectedCity;
  // console.log(city);
  const [movies, setMovies] = useState([]);
  const serverBaseUrl = import.meta.env.VITE_SERVER_BASE_URL;
  useEffect(() => {
    async function getMovies() {
      const response = await axios.get(`${serverBaseUrl}/api/v2/movies`, {params: { city }} );
      // console.log(response);
      setMovies(response.data.Movies);
    }

    getMovies();
  }, [city]);
   if (!movies) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
        <div>This will take some time to start the server</div>
      </div>
    );
  }
  const createSlug = (title) => {
    return title.toLowerCase().replace(/\s+/g, "-");
  };

  const todayIso = new Date().toISOString().slice(0, 10);
  const primeMovie = movies[0];
  const otherMovies = movies.slice(1);
  return (
    <div className="w-full px-8 py-8 ">
      {primeMovie && (
        <div className="max-w-6xl mx-auto mb-10 z-0">
          <div className="rounded-3xl bg-white border border-gray-100 shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              <div className="md:col-span-1 p-6 flex justify-center md:justify-start">
                <NavLink
                  to={`/${createSlug(primeMovie.title)}/${primeMovie.imdbId}/${todayIso}`}
                  className="group block"
                >
                  <div className="relative w-56 sm:w-64 z-0">
                    <img
                      src={primeMovie.poster}
                      alt={primeMovie.title}
                      className="w-full aspect-[3/4] object-cover rounded-2xl shadow-md transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-black/0 group-hover:bg-black/10 transition" />
                  </div>
                </NavLink>
              </div>
              <div className="md:col-span-2 p-6 flex flex-col justify-center">
                <p className="text-xs tracking-widest text-gray-500 uppercase">Prime</p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-semibold text-gray-900">
                  {primeMovie.title}
                </h1>
                <p className="mt-3 text-gray-600 max-w-xl">
                  Now showing in {city}. Pick a showtime and book your seats.
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <NavLink
                    to={`/${createSlug(primeMovie.title)}/${primeMovie.imdbId}/${todayIso}`}
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-black transition"
                  >
                    Book tickets
                  </NavLink>
                  <span className="text-sm text-gray-500">
                    Featured movie of the week
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
        {otherMovies.map((movie) => (
          <NavLink
            key={movie.imdbId}
            to={`/${createSlug(movie.title)}/${movie.imdbId}/${todayIso}`}
            className="group"
          >
            <div className="rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1">
              <div className="relative overflow-hidden rounded-lg shadow-sm group-hover:shadow-xl transition duration-300">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300" />
              </div>
              <p className="mt-2 text-sm font-medium text-gray-800 truncate">
                {movie.title}
              </p>
            </div>
          </NavLink>
        ))}
      </div>
    </div>

  )
}
export default Home
