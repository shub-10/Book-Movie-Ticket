import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MoviePage = ({ selectedCity }) => {
  const { imdbId, date: routeDate } = useParams();
  const serverBaseUrl = import.meta.env.VITE_SERVER_BASE_URL;

  const [movie, setMovie] = useState(null);
  const [theatres, setTheatres] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    routeDate || new Date().toISOString().slice(0, 10)
  );

  const next7Days = useMemo(() => {
    const out = [];
    const now = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      out.push({
        iso: d.toISOString().slice(0, 10),
        day: d.getDate(),
        week: d.toLocaleDateString("en-US", { weekday: "short" }),
        month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
      });
    }
    return out;
  }, []);

  useEffect(() => {
    async function load() {
      const [movieRes, showsRes] = await Promise.all([
        axios.get(`${serverBaseUrl}/api/v2/movies/${imdbId}`),
        axios.get(`${serverBaseUrl}/api/v2/movies/${imdbId}/shows`, {
          params: { city: selectedCity, date: selectedDate },
        }),
      ]);

      setMovie(movieRes.data.Movie);
      setTheatres(showsRes.data.theatres || []);
    }

    load();
  }, [imdbId, selectedCity, selectedDate, serverBaseUrl]);

  if (!movie) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex gap-5">
        <div className="relative">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-36 h-44 rounded-2xl object-cover"
          />
          {movie.trailerUrl && (
            <button
              onClick={() => window.open(movie.trailerUrl, "_blank")}
              className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-white/90 text-black font-semibold"
            >
              ▶
            </button>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-xl font-semibold">{movie.title}</h1>
          <p className="text-gray-600 mt-2">
            {movie.certificate || "UA"} | {(movie.Languages || []).join(", ")}{" "}
            |{" "}
            {movie.durationMins
              ? `${Math.floor(movie.durationMins / 60)} hr ${movie.durationMins % 60} min`
              : "2 hr 20 min"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-5 overflow-x-auto">
        <div className="w-10 h-14 rounded-2xl bg-gray-200 text-gray-600 flex items-center justify-center">
          <span className="text-sm -rotate-90">
            {next7Days[0]?.month}
          </span>
        </div>

        {next7Days.map((d) => (
          <button
            key={d.iso}
            onClick={() => setSelectedDate(d.iso)}
            className={
              selectedDate === d.iso
                ? "w-10 h-14 rounded-xl bg-black text-white"
                : "w-10 h-14 rounded-xl border border-gray-200 bg-white"
            }
          >
            <p className="text-lg font-semibold leading-6">{d.day}</p>
            <p className="text-sm text-gray-500">{d.week}</p>
          </button>
        ))}
      </div>


      <div className="bg-gray-100 p-3 rounded text-gray-600 text-sm">
        <span className="mr-5">● Available</span>
        <span className="mr-5 text-yellow-500">● Filling fast</span>
        <span className="text-orange-500">● Almost full</span>
      </div>

      <div className="space-y-4">
        {theatres.map((t) => (
          <div key={t.theatre._id} className="border rounded-xl p-4">
            <p className="font-semibold text-xl">{t.theatre.name}</p>
            <p className="text-gray-500 text-sm">{t.theatre.location}</p>

            <div className="flex flex-wrap gap-3 mt-4">
              {t.shows.map((s) => (
                <button key={s._id} className="px-6 py-3 border rounded-2xl">
                  {s.showtime}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviePage;
