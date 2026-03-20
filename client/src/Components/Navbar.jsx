import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import { CiLocationOn } from "react-icons/ci";
import { useState } from 'react';
import { FiLogOut } from "react-icons/fi";
export const Navbar = (props) => {
  const [location, setLocation] = useState(false);
  // const [lv, setLv] = useState("Gurgoan")
  const cities = props.cities;
  const selectedCity = props.selectedCity;
  const setSelectedCity = props.setSelectedCity;
  const { pathname } = useLocation();

  const moviesActive = pathname === '/' || pathname.startsWith('/movie/');

  return (
    <div className="w-[100vw] bg-white/90 backdrop-blur border-b border-gray-100  z-50">
      <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between ">
        <div className="flex items-center gap-4">
          <NavLink to='/' className="flex items-center gap-2">
            <span className="font-[Montserrat] text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
              GO FAST
            </span>
            <span className="text-[11px] uppercase tracking-[0.25em] text-gray-400">
              tickets
            </span>
          </NavLink>

          <div className="h-6 w-px bg-gray-200" />

          <div
            onClick={() => { setLocation(!location) }}
            className="relative cursor-pointer flex items-center gap-2 px-3 py-2 rounded-full border border-gray-200 hover:border-gray-300 transition"
          >
            <CiLocationOn className="text-gray-600" size={18} />
            <span className="text-sm font-medium text-gray-800">{selectedCity}</span>

            {location && (
              <div className="absolute top-11 left-0 bg-white shadow-lg rounded-xl p-2 z-[999] border border-gray-100 ">

                {cities.map((city) => (
                  <p
                    key={city._id}
                    className="cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg text-sm"
                    onClick={() => {
                      setSelectedCity(city.name);
                      setLocation(!location)
                      localStorage.setItem("cityId", city._id);
                    }}
                  >
                    {city.name}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <NavLink
            to='/'
            className={
              moviesActive
                ? "inline-flex items-center justify-center text-pink-700 bg-pink-100 rounded-full px-4 py-2 text-sm font-semibold"
                : "inline-flex items-center justify-center text-gray-700 rounded-full px-4 py-2 text-sm font-semibold hover:bg-gray-100"
            }
          >
            Movies
          </NavLink>
          <NavLink
            to='/saved'
            className={({ isActive }) =>
              isActive
                ? "inline-flex items-center justify-center text-blue-700 bg-blue-100 rounded-full px-4 py-2 text-sm font-semibold"
                : "inline-flex items-center justify-center text-gray-700 rounded-full px-4 py-2 text-sm font-semibold hover:bg-gray-100"
            }
          >
            Saved
          </NavLink>
          {
            !props.isloggedIn ? (
              <NavLink
                to="/login" 
                className="inline-flex items-center justify-center text-sm font-semibold px-4 py-2 rounded-full border border-gray-200 hover:border-gray-300"
                state={{ from: pathname }}
              >
                Login
              </NavLink>
            ) : (
              <button
                onClick={() => {localStorage.removeItem("token");props.setisLoggedIn(false);}}
                      className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 hover:bg-red-50 text-gray-600 hover:text-red-600 transition"

                title="Logout"
              >
                <FiLogOut size={18} />
              </button>
            )
          }
        </div>
      </div>
    </div>
  )
}
