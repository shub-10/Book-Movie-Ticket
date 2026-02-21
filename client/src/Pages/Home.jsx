import { NavLink, useParams } from 'react-router-dom';
const Home = (props) => {

  const Movies = props.Movies;
  const createSlug = (title) => {
    return title.toLowerCase().replace(/\s+/g, "-");
  };

  const date = new Date();
  // console.log("Movies:" ,Movies.length);
  const months = [
    { month: "Jan", NoOfDays: 31 },
    { month: "Feb", NoOfDays: 28 },
    { month: "Mar", NoOfDays: 31 },
    { month: "April", NoOfDays: 30 },
    { month: "May", NoOfDays: 31 },
    { month: "June", NoOfDays: 30 },
    { month: "July", NoOfDays: 31 },
    { month: "Aug", NoOfDays: 31 },
    { month: "Sept", NoOfDays: 30 },
    { month: "Oct", NoOfDays: 31 },
    { month: "Nov", NoOfDays: 30 },
    { month: "Dec", NoOfDays: 31 }
  ];

  const days = ["Sun", "Mon", "Tue", "Wed", "Thru", "Fri", "Sat"];

  const Month = months[date.getMonth()].month;
  const Today = date.getDate();
  const day = date.getDay();
  const Year = date.getFullYear();
  return (
    <div className="w-full px-8 py-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 bg-gray-50">
  {Movies &&
    Movies.map((movie) => (
      <NavLink
        key={movie.imdbId}
        to={`/movie/${createSlug(movie.title)}/${movie.imdbId}/${Year}-${days[day]}-${Today}`}
        className="group"
      >
        <div className="rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1">
          
          {/* Poster */}
          <div className="relative overflow-hidden rounded-lg shadow-sm group-hover:shadow-xl transition duration-300">
            <img
              src={movie.poster}
              alt={movie.title}
              className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Subtle Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300" />
          </div>

          {/* Title */}
          <p className="mt-2 text-sm font-medium text-gray-800 truncate">
            {movie.title}
          </p>
        </div>
      </NavLink>
    ))}
</div>

  )
}
export default Home