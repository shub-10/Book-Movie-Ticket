import React from 'react'
import { NavLink } from 'react-router-dom';

export const Navbar = () => {

  return (
    <div className="w-[100vw] px-4 py-2 flex flex-row border-gray-200 shadow-md mb-2">
        <p className="w-1/4 text-[30px] font-bold ">GO FAST</p>
        <div className="w-3/4 flex justify-center items-center">
          <div className="w-1/2 mt-2 flex justify-evenly items-center">
          <NavLink to='/' end className={({isActive}) => isActive ? 
            "text-gray-500 bg-gray-200 rounded-full": 
            "text-gray-800"}>
              <p className="text-[15px] font-bold  px-3 py-1">Movies</p>
          </NavLink>
           <NavLink to='/saved' className={({isActive}) => isActive ?
            "text-blue-500 bg-blue-200 rounded-full": "text-gray-800"}>
            <p className="text-[15px] font-bold px-3 py-1">Saved </p>
           </NavLink>
            
           
          </div>
        </div>
    </div>
  )
}
