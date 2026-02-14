import { Link } from 'react-router-dom'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { useState } from 'react';
const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <div className="flex flex-col gap-2">
        <input type="text" placeholder="Username/Email" className="border border-gray-700 rounded-sm px-3 outline-none" />
        <div className="flex flex-row px-3 border border-gray-700  rounded-sm">
          <input type={showPassword ? "text" : "password"} placeholder="Password" className="outline-none" />
          <div className="flex justify-center items-center">
            {showPassword ? (<FaRegEye size={15} onClick={() => { setShowPassword(!showPassword) }} />) : (<FaRegEyeSlash size={15} onClick={() => setShowPassword(!showPassword)} />)}

          </div>
        </div>

        <div className="flex flex-col justify-end">
          <button className="text-white font-bold bg-blue-300 px-3 py-1 rounded-lg">Login</button>
          <p className="text-[14px]">
            create account <Link to='/signup'><span className="underline text-blue-800">signup</span></Link>
          </p>
        </div>
      </div>


    </div>
  )
}

export default Login
