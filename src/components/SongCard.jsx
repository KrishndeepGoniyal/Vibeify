import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToPlaylist } from "../features/playlistSlice";

export default function SongCard({ song }) {
  const dispatch = useDispatch();
  const playlist = useSelector((state) => state.playlist.playlist);
  const { status, userData } = useSelector((state) => state.auth);
  const [showDetails, setShowDetails] = useState(false);
  const [adding, setAdding] = useState(false);

  if (!song) return null;

  const isAdded = playlist.includes(song.id);

  const AddSong = async () => {
    if (isAdded || !userData?.$id) return;
    setAdding(true);
    try {
      await dispatch(addToPlaylist({ songId: song.id, userId: userData.$id }));
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="w-80 perspective mb-8">
      <div
        className={`z-9 relative w-full h-90 transition-transform duration-700 transform-style-preserve-3d ${
          showDetails ? "rotate-y-180" : ""
        }`}
      >
        {/* front side */}
        <div className="absolute w-full h-full bg-transparent shadow-md rounded-2xl p-4 flex flex-col items-center justify-between backface-hidden">
          <img
            src={song.album?.cover_medium || "https://via.placeholder.com/150"}
            alt={song.title}
            className="rounded-xl w-45 h-45 object-cover"
          />
          <h3 className="mt-2 font-semibold text-gray-800 text-sm truncate w-full text-center">
            {song.title}
          </h3>
          <p className="text-gray-500 text-xs truncate w-full text-center">
            {song.artist?.name}
          </p>

          {/* details button */}
          <button
            onClick={() => setShowDetails(true)}
            className="px-4 py-2 text-xs bg-black text-white rounded-full hover:bg-gray-800 hover:px-5 transition-all duration-300"
          >
            Details
          </button>

          {status &&
            (isAdded ? (
              <button
                disabled
                className="px-3 py-2 text-xs bg-gray-400 text-white rounded-full cursor-not-allowed"
              >
                Added
              </button>
            ) : (
              <button
                onClick={AddSong}
                disabled={adding}
                className={`px-3 py-2 text-xs rounded-full transition-all duration-300 ${
                  adding
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-gray-100 text-black hover:bg-black hover:text-white"
                }`}
              >
                {adding ? "Adding..." : "Add to Playlist"}
              </button>
            ))}
        </div>

        {/* back side */}
        <div className="absolute w-full h-full bg-white shadow-md rounded-2xl p-4 flex flex-col items-center justify-between rotate-y-180 backface-hidden">
          <h3 className="font-semibold text-gray-800 text-sm text-center mb-2">
            {song.title}
          </h3>
          <p className="text-gray-500 text-xs mb-2">{song.artist?.name}</p>

          {song.preview ? (
            <audio controls className="w-full m-auto">
              <source src={song.preview} type="audio/mpeg" />
            </audio>
          ) : (
            <p className="text-xs text-gray-400">No preview available</p>
          )}

          <button
            onClick={() => setShowDetails(false)}
            className="px-6 py-2 text-xs bg-gray-700 text-white rounded-full hover:bg-gray-900 transition"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
