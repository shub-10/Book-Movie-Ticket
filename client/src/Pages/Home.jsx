import { NavLink } from 'react-router-dom';
const Home = (props) => {

  const Movies = props.Movies;
  const createSlug = (title) => {
    return title.toLowerCase().replace(/\s+/g, "-");
  };
  // console.log("Movies:" ,Movies.length);
  return (
    <div className="w-[100vw] grid grid-cols-6 gap-3">
      {
        Movies && Movies.map((movie) => (
          <NavLink key={movie.imdbID} to={`/movie/${createSlug(movie.Title)}/${movie.imdbID}`}>
            <div  className="border border-gray-200 bg-white rounded-lg cursor-pointer">
              <img src={movie.Poster} alt="movie-poster" className="aspect-[2/3] object-cover rounded-lg" />
              <p>{movie.Title}</p>
            </div>
          </NavLink>
        ))
      }

    </div>
  )
}
export default Home