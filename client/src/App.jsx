import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Signup from './Pages/Signup.jsx';
import MoviePage from './Pages/MoviePage.jsx';
import { Navbar } from './Components/Navbar.jsx';
import SeatLayout from './Pages/SeatLayout.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Footer from './Components/Footer.jsx';
import Saved from './Pages/Saved.jsx';
import { Payment } from './Pages/Payment.jsx';


function App() {

  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("Delhi");
  const serverBaseUrl = import.meta.env.VITE_SERVER_BASE_URL;
  const [isloggedIn, setisLoggedIn] = useState(false);

  const token = localStorage.getItem('token');
  if (token) {
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem('token');
    }
  }


  useEffect(() => {
    const fetchCities = async () => {
      const res = await axios.get(`${serverBaseUrl}/api/v2/cities`);
      setCities(res.data.Cities);
    };

    fetchCities();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setisLoggedIn(true);
    }
  }, []);
  return (
    <div className="min-h-screen flex flex-col m-0 p-0">
      <Navbar cities={cities} selectedCity={selectedCity} setSelectedCity={setSelectedCity} isloggedIn={isloggedIn} setisLoggedIn={setisLoggedIn} />
      <main className="flex-1 bg-gray-50 z-0">
        <Routes>
          <Route path='/' element={<Home selectedCity={selectedCity} />} />
          <Route path='/saved' element={<Saved />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login isloggedIn={isloggedIn} setisLoggedIn={setisLoggedIn} />} />
          <Route path='/:slug/:imdbId/:date' element={<MoviePage selectedCity={selectedCity} />} />
          <Route path='/show/:showId/seat-layout' element={<SeatLayout />} />
          <Route path='/payment/:showId' element={<Payment />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App;
