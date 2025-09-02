import React from "react";
import logo from "../assets/pngwing.com.png";

function Home() {
  return (
    <div className="h-screen w-full relative overflow-hidden bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 flex flex-col md:flex-row">
      
      {/* Left Text Section */}
      <section className="w-full md:w-1/2 flex flex-col justify-center items-start md:pl-20 pl-6 gap-4 md:gap-6 z-10 mt-10 md:mt-0">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800">Your Mood</h1>
        <h2 className="text-2xl md:text-4xl font-semibold text-gray-700">Your Playlist</h2>
        <h3 className="text-xl md:text-2xl text-gray-600">Your Vibe</h3>
        <p className="mt-2 md:mt-4 text-gray-500 max-w-md text-sm md:text-base">
          Discover songs that match your mood, anytime, anywhere. Let the music guide your day.
        </p>
      </section>

      {/* Right Animated Logo Section */}
      <section className="w-full md:w-1/2 relative flex justify-center items-center z-10 mt-10 md:mt-0">
        <div
          className="w-56 md:w-80 h-56 md:h-80 rounded-full shadow-xl flex justify-center items-center text-gray-400 text-xl animate-hover"
          style={{
            backgroundImage: `url(${logo})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "drop-shadow(0 0 10px rgba(0, 0, 0, 0.1))"
          }}
        ></div>
      </section>

      {/* cloud */}
      <div className="absolute top-10 left-0 w-24 h-16 md:w-32 md:h-20 bg-white rounded-full opacity-70 animate-cloud1"></div>
      <div className="absolute top-32 left-6 w-36 h-20 md:w-48 md:h-28 bg-white rounded-full opacity-50 animate-cloud2"></div>
      <div className="absolute top-1/2 left-16 w-32 h-16 md:w-40 md:h-24 bg-white rounded-full opacity-60 animate-cloud3"></div>

      {/*notes */}
      <div className="absolute bottom-10 right-10 text-2xl md:text-4xl animate-music1">🎵</div>
      <div className="absolute bottom-20 right-20 md:right-32 text-xl md:text-3xl animate-music2">🎶</div>
      <div className="absolute bottom-16 right-40 md:right-64 text-lg md:text-2xl animate-music3">🎵</div>


      <style>
        {`
          @keyframes hover {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          } 
          @keyframes cloudMove1 {
            0% { transform: translateX(-10vw); }
            100% { transform: translateX(120vw); }
          }
          @keyframes cloudMove2 {
            0% { transform: translateX(-20vw); }
            100% { transform: translateX(140vw); }
          }
          @keyframes cloudMove3 {
            0% { transform: translateX(-30vw); }
            100% { transform: translateX(100vw); }
          }
          @keyframes musicMove1 {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(-60vh) rotate(360deg); opacity: 0; }
          }
          @keyframes musicMove2 {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(-50vh) rotate(-360deg); opacity: 0; }
          }
          @keyframes musicMove3 {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(-70vh) rotate(360deg); opacity: 0; }
          }

          .animate-cloud1 { animation: cloudMove1 60s linear infinite; }
          .animate-cloud2 { animation: cloudMove2 80s linear infinite; }
          .animate-cloud3 { animation: cloudMove3 70s linear infinite; }

          .animate-music1 { animation: musicMove1 8s linear infinite; }
          .animate-music2 { animation: musicMove2 10s linear infinite; }
          .animate-music3 { animation: musicMove3 12s linear infinite; }

          .animate-hover { animation: hover 4s ease-in-out infinite; }
        `}
      </style>
    </div>
  );
}

export default Home;
