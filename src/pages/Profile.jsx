import React, { useState } from "react";
import { User, Mail, Calendar } from "lucide-react";
import { useSelector } from "react-redux";

function Profile() {
  const userData = useSelector((state) => state.auth.userData);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 flex justify-center items-center px-6 py-12">
      <div className="w-full max-w-md perspective">
        <div
          className={`relative w-full h-[450px] transition-transform duration-700 transform-style-preserve-3d ${
            showDetails ? "rotate-y-180" : ""
          }`}
        >
        
          <div className="absolute w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 flex flex-col justify-center items-center p-10 backface-hidden rounded-3xl shadow-2xl">
            <div className="w-40 h-40 rounded-full bg-white shadow-xl flex items-center justify-center">
              <User size={80} className="text-purple-600" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-white">
              {userData?.name || "User"}
            </h2>
            <p className="text-white/90">Premium Customer</p>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="mt-6 px-6 py-2 bg-white text-purple-600 font-semibold rounded-full shadow hover:bg-purple-100 transition"
            >
              Show Details
            </button>
          </div>

      
          <div className="absolute w-full h-full bg-white p-10 flex flex-col justify-center rounded-3xl shadow-2xl rotate-y-180 backface-hidden">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Profile Details
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="text-purple-500" size={20} />
                <span className="text-gray-700">{userData?.email || "guest"}</span>
              </div>
              <div className="flex items-center gap-3">
                <User className="text-purple-500" size={20} />
                <span className="text-gray-700">
                  Username: {userData?.name || "new_user"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="text-purple-500" size={20} />
                <span className="text-gray-700">
                  Member since:{" "}
                  {new Date(userData?.$createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowDetails(false)}
              className="mt-8 px-6 py-2 bg-purple-600 text-white font-semibold rounded-full shadow hover:bg-purple-700 transition"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
