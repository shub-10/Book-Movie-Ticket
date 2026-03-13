import { Link } from 'react-router-dom'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const serverBaseUrl = import.meta.env.VITE_SERVER_BASE_URL;
  const navigate = useNavigate();
  const signupUser = async () => {
    if (!username || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
      const res = await axios.post(`${serverBaseUrl}/api/v2/auth/signup`, { username, password, confirmPassword });
      if (res.status === 200) {
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-400">GO FAST</p>
        <h1 className="text-2xl font-semibold text-gray-900 mt-2">Create account</h1>
        <p className="text-sm text-gray-500 mt-1">Save movies and book faster.</p>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase">Email or Username</label>
          <input
            type="text"
            placeholder="you@example.com"
            className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-gray-900/10"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase">Password</label>
          <div className="mt-2 flex items-center px-4 py-2.5 border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-gray-900/10">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="flex-1 outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" className="text-gray-500" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaRegEye size={16} /> : <FaRegEyeSlash size={16} />}
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase">Confirm Password</label>
          <div className="mt-2 flex items-center px-4 py-2.5 border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-gray-900/10">
            <input
              type={showCPassword ? "text" : "password"}
              placeholder="••••••••"
              className="flex-1 outline-none"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="button" className="text-gray-500" onClick={() => setShowCPassword(!showCPassword)}>
              {showCPassword ? <FaRegEye size={16} /> : <FaRegEyeSlash size={16} />}
            </button>
          </div>
        </div>

        <button
          className="bg-gray-900 text-white font-semibold py-2.5 rounded-xl hover:bg-black transition"
          onClick={signupUser}
        >
          Create Account
        </button>

        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-gray-900 font-semibold underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  </div>
);


}

export default Signup
