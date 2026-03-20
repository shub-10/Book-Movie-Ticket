import { Link } from 'react-router-dom'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
const Login = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const serverBaseUrl = import.meta.env.VITE_SERVER_BASE_URL;
  const loginUser = async () => {
    try {
      if (!username || !password) {
        alert("Username and Password is required");
        return;
      }
      const res = await axios.post(`${serverBaseUrl}/api/v2/auth/login`, { username, password });
      // console.log(res);
      if (res.status === 200) {
        localStorage.setItem('token', res.data.token);
        props.setisLoggedIn(true);
        navigate(from);
      }
      else if (res.status === 400) {
        alert("Login credentials are wrong")
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="p-10 flex flex-col justify-center gap-6">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Welcome back</h1>
            <p className="text-gray-500 mt-2">Log in to manage your bookings and saved movies.</p>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-xs font-semibold tracking-wide text-gray-500 uppercase">Email or Username</label>
            <input
              type="text"
              placeholder="you@example.com"
              className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-xs font-semibold tracking-wide text-gray-500 uppercase">Password</label>
            <div className="flex items-center px-4 py-3 border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-gray-900/10">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="flex-1 outline-none"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEye size={16} /> : <FaRegEyeSlash size={16} />}
              </button>
            </div>
          </div>

          <button
            className="bg-gray-900 text-white font-semibold py-3 rounded-xl hover:bg-black transition"
            onClick={loginUser}
          >
            Login
          </button>

          <p className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-gray-900 font-semibold underline">
              Sign up
            </Link>
          </p>
        </div>

        <div className="hidden md:flex bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-10 flex-col justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">GO FAST</p>
            <h2 className="mt-4 text-3xl font-semibold">Book faster. Save more.</h2>
            <p className="mt-3 text-gray-300">
              Your seats, your shows, your time. Login to continue.
            </p>
          </div>
          <div className="text-xs text-gray-400">Secure JWT authentication</div>
        </div>
      </div>
    </div>
  );

}

export default Login
