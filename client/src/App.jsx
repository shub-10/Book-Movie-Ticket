import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Signup from './Pages/Signup.jsx';
import MoviePage from './Pages/MoviePage.jsx';
import { Navbar } from './Components/Navbar.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';
function App() {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function getMovies() {
      const response = await axios("/api/v2/getMovies");
      // console.log(response);
      setMovies(response.data.Movies);
    }

    getMovies();
  }, []);


  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home Movies={movies} />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/movie/:slug/:id/:now' element={<MoviePage/>}/>
      </Routes>
    </div>
  )
}

export default App;