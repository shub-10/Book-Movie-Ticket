
const Movie = require('../Models/movie');

const seedMovies = async (req, res) => {
  const data = [
    { "imdbId": "tt15398776", "title": "Oppenheimer", "poster": "https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg", "Languages": "English" },
    { "imdbId": "tt1517268", "title": "Barbie", "poster": "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg", "Languages": "English" },
    { "imdbId": "tt9603212", "title": "Mission Impossible Dead Reckoning", "poster": "https://image.tmdb.org/t/p/w500/NNxYkU70HPurnNCSiCjYAmacwm.jpg", "Languages": "English" },
    { "imdbId": "tt9362722", "title": "Spider-Man Across the Spider-Verse", "poster": "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg", "Languages": "English" },
    { "imdbId": "tt5433140", "title": "Fast X", "poster": "https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg", "Languages": "English" },

    { "imdbId": "tt15428134", "title": "Jawan", "poster": "https://image.tmdb.org/t/p/w500/8QVDXDiOGHRcAD4oM6MXjE0osSj.jpg", "Languages": "Hindi" },

    { "imdbId": "tt1745960", "title": "Top Gun Maverick", "poster": "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg", "Languages": "English" },
    { "imdbId": "tt10648342", "title": "Thor Love and Thunder", "poster": "https://image.tmdb.org/t/p/w500/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg", "Languages": "English" },
    { "imdbId": "tt10872600", "title": "Spider-Man No Way Home", "poster": "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg", "Languages": "English" },
    { "imdbId": "tt9419884", "title": "Doctor Strange Multiverse of Madness", "poster": "https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg", "Languages": "English" },
    { "imdbId": "tt1877830", "title": "The Batman", "poster": "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg", "Languages": "English" },
    { "imdbId": "tt8291224", "title": "Uri The Surgical Strike", "poster": "https://image.tmdb.org/t/p/w500/yNySAgpAnWmPpYinim9E0tUzJWG.jpg", "Languages": "Hindi" },
    { "imdbId": "tt4154796", "title": "Avengers Endgame", "poster": "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg", "Languages": "English" },
    { "imdbId": "tt0848228", "title": "The Avengers", "poster": "https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg", "Languages": "English" },
    { "imdbId": "tt0468569", "title": "The Dark Knight", "poster": "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg", "Languages": "English" },
    { "imdbId": "tt10838180", "title": "The Flash", "poster": "https://image.tmdb.org/t/p/w500/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg", "Languages": "English" },
    { "imdbId": "tt10954600", "title": "Ant-Man and the Wasp Quantumania", "poster": "https://image.tmdb.org/t/p/w500/qnqGbB22YJ7dSs4o6M7exTpNxPz.jpg", "Languages": "English" },

    { "imdbId": "tt6710474", "title": "Everything Everywhere All at Once", "poster": "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg", "Languages": "English" },
    { "imdbId": "tt2380307", "title": "Coco", "poster": "https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg", "Languages": "English" },
    { "imdbId": "tt7286456", "title": "Joker", "poster": "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg", "Languages": "English" },
    { "imdbId": "tt0816692", "title": "Interstellar", "poster": "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg", "Languages": "English" },

    { "imdbId": "tt1187043", "title": "3 Idiots", "poster": "https://image.tmdb.org/t/p/w500/66A9MqXOyVFCssoloscw79z8Tew.jpg", "Languages": "Hindi" },
    { "imdbId": "tt9362930", "title": "No Time To Die", "poster": "https://image.tmdb.org/t/p/w500/iUgygt3fscRoKWCV1d0C7FbM9TP.jpg", "Languages": "English" },
    { "imdbId": "tt1879016", "title": "Operation Fortune", "poster": "https://image.tmdb.org/t/p/w500/uo7vWfQUlVwueYTDRicXOJa8Oow.jpg", "Languages": "English" },
    { "imdbId": "tt1630029", "title": "Avatar The Way of Water", "poster": "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg", "Languages": "English" },
    { "imdbId": "tt1160419", "title": "Dune", "poster": "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg", "Languages": "English" },
    { "imdbId": "tt1877830", "title": "The Batman 2022", "poster": "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg", "Languages": "English" },
    { "imdbId": "tt6264654", "title": "Free Guy", "poster": "https://image.tmdb.org/t/p/w500/acCS12FVUQ7blkC8qEbuXbsWEs2.jpg", "Languages": "English" },
    { "imdbId": "tt5113044", "title": "Minions The Rise of Gru", "poster": "https://image.tmdb.org/t/p/w500/wKiOkZTN9lUUUNZLmtnwubZYONg.jpg", "Languages": "English" },
    { "imdbId": "tt8176054", "title": "Stree 2", "poster": "https://image.tmdb.org/t/p/w500/9MIsN3n3sAxMZyqWkldO2Zp7g9L.jpg", "Languages": "Hindi" },
    { "imdbId": "tt4430212", "title": "Drishyam 2", "poster": "https://image.tmdb.org/t/p/w500/7k8E3Wz1x1o1t4bmPqhGV8eK3op.jpg", "Languages": "Hindi" },
    { "imdbId": "tt15782600", "title": "Leo", "poster": "https://image.tmdb.org/t/p/w500/9X5Lxqzv2YfFVQxw2d3ZpV9Q6wG.jpg", "Languages": "Hindi" }

  ]
  await Movie.insertMany(data);
  res.send("movies seeded...")
}
module.exports = { seedMovies };