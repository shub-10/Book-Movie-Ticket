import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
const MoviePage = () => {
  const [movie, setMovie] = useState({});

  // const serverBaseUrl = import.meta.env.VITE_SERVER_BASE_URL;
  const { id } = useParams();

  useEffect(() => {
    async function getMovie() {
      const res = await axios.get(`/api/v2/getMovie/${id}`)
      setMovie(res.data.Movie);
    }
    getMovie();
  }, [id]);
  const date = new Date();
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
  const NoOfdays = months[date.getMonth()].NoOfDays;
  const Today = date.getDate();
  const Day = days[date.getDay()];

  return (
    <div className="w-[100vw] flex flex-row justify-center">
      <div className="w-3/4 flex flex-col gap-8">
        <div className="flex flex-row gap-3">
          <img src={movie.Poster} alt="movie-poster" className="h-[200px] w-[150px] object-cover rounded-lg" />
          <div className="text-gray-800 flex flex-col justify-center">
            <p className=" text-[20px] font-semibold ">{movie.Title}</p>
            <p className="text-[14px]"> UA16+ | {movie.Language} | {movie.Runtime}</p>
            <p className="text-[14px]">Year- {movie.Year}</p>
          </div>
        </div>

        <div className="flex flex-row gap-3">
          <div className="bg-gray-200 rounded-full flex flex-col justify-center items-center text-gray-600 text-[15px]"><p className="-rotate-90">{Month.toUpperCase()}</p></div>
          
             {
              (Today+1 > NoOfdays)? (<div>
                <p className="font-bold">{1}</p>
                <p className="text-[15px] ">{}</p>
              </div>
              ): ( <div>
                <p className="font-bold">{Today}</p>
                <p className="text-[15px] ">{Day}</p>
              </div>
              )
             }
          
        </div>
      </div>
    </div>
  )
}

export default MoviePage;
