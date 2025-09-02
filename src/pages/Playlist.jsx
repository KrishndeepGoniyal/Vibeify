import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PlaylistCard from "../components/PlaylistCard";
import { playlistService } from "../services/playlistService";

function Playlist() {
  const { userData } = useSelector((state) => state.auth);
  const [playlist, setPlaylist] = useState([]); 
  const [loading, setLoading] = useState(true);

  async function fetchPlaylist() {
    if (!userData?.$id) return;

    try {
      const playlistRes = await playlistService.getPlaylist(userData.$id);
      
      setPlaylist(playlistRes);
    } catch (error) {
      console.error("Error fetching playlist:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPlaylist();
  }, [userData]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-green-200 via-blue-200 to-purple-200">
      <div className="flex flex-col py-10 px-5">
        <h1 className="text-center font-semibold text-4xl text-shadow-white">
          Your Playlist
        </h1>

        {loading ? (
          <p className="text-center mt-6 text-gray-600">Loading playlist...</p>
        ) : playlist.length > 0 ? (
          <PlaylistCard playlist={playlist} />
        ) : (
          <p className="text-center mt-6 text-gray-600">
            Your playlist is empty.
          </p>
        )}
      </div>
    </div>
  );
}

export default Playlist;
