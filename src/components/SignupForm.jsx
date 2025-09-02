import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, UserPlus } from "lucide-react";
import Authservice from "../services/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { login } from "../features/authSlice";

function SignupForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("⚠ Please fill in all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("⚠ Passwords do not match.");
      return;
    }

    setError("");
    try {
      const response = await Authservice.createAccount(formData);
      if (response) {
        const user = await Authservice.getUser();
        dispatch(login(user));
        navigate("/");
      } else {
        setError(" Signup failed. Try again.");
      }
    } catch (err) {
      setError("⚠ Something went wrong. Please try later.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 px-4 overflow-y-auto">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-full max-w-md bg-white/20 backdrop-blur-lg 
                   shadow-2xl border border-white/30 p-10 sm:p-6 rounded-3xl"
      >
        {/* formtitle */}
        <div className="flex items-center justify-center gap-2">
          <UserPlus className="text-green-600" size={32} />
          <h2 className="text-4xl font-extrabold text-center text-gray-800 drop-shadow-sm">
            Create Account
          </h2>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm bg-red-100/70 p-2 rounded-lg text-center">
            {error}
          </p>
        )}

        {/* Username */}
        <div className="flex items-center bg-white/70 rounded-xl p-3 shadow-sm focus-within:shadow-md transition-all">
          <User className="text-gray-500 mr-3 flex-shrink-0" size={22} />
          <input
            type="text"
            name="username"
            placeholder="Enter username..."
            value={formData.username}
            onChange={handleChange}
            className="flex-1 min-w-0 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-lg"
          />
        </div>

        {/* Email */}
        <div className="flex items-center bg-white/70 rounded-xl p-3 shadow-sm focus-within:shadow-md transition-all">
          <Mail className="text-gray-500 mr-3 flex-shrink-0" size={22} />
          <input
            type="email"
            name="email"
            placeholder="Enter email..."
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
            name="password"
            placeholder="Enter password..."
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

        {/* Confirm Password */}
        <div className="flex items-center bg-white/70 rounded-xl p-3 shadow-sm focus-within:shadow-md transition-all">
          <Lock className="text-gray-500 mr-3 flex-shrink-0" size={22} />
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm password..."
            value={formData.confirmPassword}
            onChange={handleChange}
            className="flex-1 min-w-0 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-lg"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="ml-2 text-gray-500 hover:text-gray-700 flex-shrink-0"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-gradient-to-r 
                     from-green-500 to-blue-500 text-white font-semibold 
                     py-3 text-lg rounded-xl shadow-lg hover:scale-105 hover:shadow-xl 
                     transition-transform duration-300"
        >
          <UserPlus size={20} />
          Sign Up
        </button>

        {/* Login Link */}
        <p className="text-sm text-gray-700 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-green-600 font-medium hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default SignupForm;
