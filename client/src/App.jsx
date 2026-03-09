import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Signup from './Pages/Signup.jsx';
import MoviePage from './Pages/MoviePage.jsx';
import { Navbar } from './Components/Navbar.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';
function App() {

  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("Delhi");
  const serverBaseUrl = import.meta.env.VITE_SERVER_BASE_URL;
  useEffect(() => {
    const fetchCities = async () => {
      const res = await axios.get(`${serverBaseUrl}/api/v2/cities`);
      setCities(res.data.Cities);
    };

    fetchCities();
  }, []);


  return (
    <div>
      <Navbar cities={cities} selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
      <Routes>
        <Route path='/' element={<Home selectedCity={selectedCity}/>} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/:slug/:imdbId/:date' element={<MoviePage selectedCity={selectedCity} />} />
      </Routes>
    </div>
  )
}

export default App;