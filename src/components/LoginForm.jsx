import React, { useState } from "react";
import { User, Lock, Eye, EyeOff, LogIn, Link } from "lucide-react"; 
import Authservice from "../services/auth";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";
import { Link, useNavigate } from "react-router";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("⚠ Please fill in both fields.");
      return;
    }

    setError("");
    try {
      const res = await Authservice.loginService(formData);
      if (res) {
        const user = await Authservice.getUser();
        dispatch(login(user));
        navigate("/");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("⚠ Something went wrong. Try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 px-4 overflow-y-auto">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-full max-w-md bg-white/20 backdrop-blur-lg 
                   shadow-2xl border border-white/30 p-10 rounded-3xl"
      >
        {/* Title */}
        <div className="flex items-center justify-center gap-2">
          <h2 className="text-4xl font-extrabold text-center text-gray-800 drop-shadow-sm">
            Welcome Back
          </h2>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm bg-red-100/70 p-2 rounded-lg text-center">
            {error}
          </p>
        )}

        {/* Email */}
        <div className="flex items-center bg-white/70 rounded-xl p-3 shadow-sm focus-within:shadow-md transition-all">
          <User className="text-gray-500 mr-3 flex-shrink-0" size={22} />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your Email..."
            value={formData.email}
            onChange={handleChange}
            className="flex-1 min-w-0 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-lg"
          />
        </div>

        {/* Password */}
        <div className="flex items-center bg-white/70 rounded-xl p-3 shadow-sm focus-within:shadow-md transition-all">
          <Lock className="text-gray-500 mr-3 flex-shrink-0" size={22} />
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Enter your password..."
            value={formData.password}
            onChange={handleChange}
            className="flex-1 min-w-0 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-lg"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="ml-2 text-gray-500 hover:text-gray-700 flex-shrink-0"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-gradient-to-r 
                     from-blue-500 to-purple-500 text-white font-semibold 
                     py-3 text-lg rounded-xl shadow-lg hover:scale-105 hover:shadow-xl 
                     transition-transform duration-300"
        >
          <LogIn size={20} />
          Login
        </button>

        {/* Signup */}
        <p className="text-sm text-gray-700 text-center">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
