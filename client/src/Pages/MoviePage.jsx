import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom'

const MoviePage = () => {
  const [movie, setMovie] = useState([]);

  // const serverBaseUrl = import.meta.env.VITE_SERVER_BASE_URL;
  const { slug, id, now } = useParams();

  useEffect(() => {
    async function getMovie() {
      const res = await axios.get(`/api/v2/getMovie/${id}`)
      console.log("res:", res);
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
  const day = date.getDay();
  const Year = date.getFullYear();
  const arr = [];

  function setDates() {
    let count = 0;

    for (let d = Today, d2 = day; count < 3; d++, d2++) {
      if (d > NoOfdays) d = 1;
      if (d2 > 6) d2 = 0;
      arr.push({ dt: d, dy: days[d2] });
      count++;
    }


  }
  setDates();
  return (
    <div className="w-[100vw] flex flex-row justify-center">
      <div className="w-3/4 flex flex-col gap-8">
        {/* <div > */}
          {
            movie && movie.map((m) => (
              <div className="flex flex-row gap-3"> <img src={m.poster} alt="movie-poster" className="h-[200px] w-[150px] object-cover rounded-lg" />
                <div className="text-gray-800 flex flex-col justify-center">
                  <p className=" text-[20px] font-semibold ">{m.title}</p>
                </div></div>
            ))
          }
        {/* </div> */}

        <div className="flex flex-row gap-3">
          <div className="bg-gray-200 rounded-full flex flex-col justify-center items-center text-gray-600 text-[15px]"><p className="-rotate-90">{Month.toUpperCase()}</p></div>
          <div className="flex flex-row gap-5">
            {
              arr.map((item, index) => (
                <NavLink key={item.dt} to={`/movie/${slug}/${id}/${Year}-${item.dy}-${item.dt}`} className={({ isActive }) => isActive ? "w-[40px] px-2 py-1 bg-gray-950 text-white rounded-lg cursor-pointer" : "px-3 py-2  text-black rounded-lg cursor-pointer"}>
                  <div className="flex flex-col items-center">
                    <p className="font-bold">{item.dt}</p>
                    <p className="text-[15px] text-gray-500">{item.dy} </p>
                  </div>

                </NavLink>

              ))
            }
          </div>


        </div>
      </div>
    </div>
  )
}

export default MoviePage;
