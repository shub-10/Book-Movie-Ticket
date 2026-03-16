import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const MoviePage = ({ selectedCity }) => {
  const { slug, imdbId, date } = useParams();

  const navigate = useNavigate();
  const serverBaseUrl = import.meta.env.VITE_SERVER_BASE_URL;
  const [availableDates, setAvailableDates] = useState([]);
  const [movie, setMovie] = useState(null);
  const [theatres, setTheatres] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    date || new Date().toISOString().slice(0, 10)
  );

  const next7Days = useMemo(() => {
    const out = [];
    const now = new Date();
    for (let i = 0; i < availableDates.length; i++) {
      // Parse availableDate as UTC and convert to Asia/Kolkata
      const utcDate = new Date(availableDates[i]);
      const kolkataDate = new Date(
        utcDate.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
      );
      const availableDate = kolkataDate.toLocaleDateString("en-CA", {
        timeZone: "Asia/Kolkata"
      });
      const today = new Date(
        now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
      ).toISOString().slice(0, 10);
      if (availableDate >= today) {
        out.push({
          iso: availableDate,
          day: kolkataDate.getDate(),
          week: kolkataDate.toLocaleDateString("en-US", { weekday: "short" }),
          month: kolkataDate.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
        });
      }
    }
    return out;
  }, [availableDates]);

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
      // console.log("shows: ", showsRes);
      setAvailableDates(showsRes.data.availableDates || []);
    }

    load();
  }, [imdbId, selectedCity, selectedDate]);

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
      </div>
    );
  }

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
              Play
            </button>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-xl font-semibold">{movie.title}</h1>
          <p className="text-gray-600 mt-2">
            {movie.certificate || "UA"} | {(movie.Languages || []).join(", ")}{" "}

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
            onClick={() => {
              setSelectedDate(d.iso);
              navigate(`/${slug}/${imdbId}/${d.iso}`, { replace: true });

            }}
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
        <span className="mr-5">Available</span>
        <span className="mr-5 text-yellow-600">Filling fast</span>
        <span className="text-orange-600">Almost full</span>
      </div>

      <div className="space-y-4">
        {theatres.map((t) => (
          <div key={t.theatre._id} className="border rounded-xl p-4">
            <p className="font-semibold text-xl">{t.theatre.name}</p>
            <p className="text-gray-500 text-sm">{t.theatre.location}</p>

            <div className="flex flex-wrap gap-3 mt-4">
              {t.shows.map((s) => (
                <button key={s._id} onClick={() => navigate(`/show/${s._id}/seat-layout`)} className="px-6 py-3 border rounded-2xl">
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
