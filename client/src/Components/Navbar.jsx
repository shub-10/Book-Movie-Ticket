import React from 'react'
import { NavLink } from 'react-router-dom';
import { CiLocationOn } from "react-icons/ci";
import { useEffect, useState } from 'react';
import axios from 'axios';

export const Navbar = (props) => {
  const [location, setLocation] = useState(false);
  // const [lv, setLv] = useState("Gurgoan")
  const cities = props.cities;
  const selectedCity = props.selectedCity;
  const setSelectedCity = props.setSelectedCity;
 
  return (
    <div className="w-[100vw] px-4 py-2 flex flex-row border-gray-200 shadow-md mb-2">
      <div className="w-1/3 flex flex-row items-center gap-4">
        <NavLink to='/' ><p className="text-[30px] font-bold whitespace-nowrap">GO FAST</p>
        </NavLink>
        <div className="text-gray-400 "> | </div>
        <div onClick={() => { setLocation(!location) }} className="relative cursor-pointer flex flex-row">
         <CiLocationOn className="text-purple-500" size={23} />
          <p className="font-semibold ">{selectedCity}</p>
        
        {
          location && (
            <div className="absolute top-6 bg-white shadow-lg rounded-lg p-2 z-10">
              {
              cities.map((city)=> (
                <p 
                key={city._id}
                className="cursor-pointer hover:bg-gray-100 px-3 py-1 rounded"
                onClick={()=>{
                  setSelectedCity(city.name);
                  setLocation(!location)
                  localStorage.setItem("cityId", city._id);
                }}
                >
                {city.name}
                </p>
              ))
              }
            </div>
          )
        }
        </div>
      </div>

      <div className="w-2/3 flex justify-center items-center">
        <div className="w-1/2 mt-2 flex justify-evenly items-center">
          <NavLink to='/' end className={({ isActive }) => isActive ?
            "text-pink-500 bg-pink-200 rounded-full" :
            "text-gray-800"}>
            <p className="text-[15px] font-bold  px-3 py-1">Movies</p>
          </NavLink>
          <NavLink to='/saved' className={({ isActive }) => isActive ?
            "text-blue-500 bg-blue-200 rounded-full" : "text-gray-800"}>
            <p className="text-[15px] font-bold px-3 py-1">Saved </p>
          </NavLink>
        </div>
      </div>
    </div>
  )
}
