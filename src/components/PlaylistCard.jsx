import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPlaylist } from "../features/playlistSlice";
import { LoaderPinwheel } from "lucide-react";

function PlaylistCard() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const { playlist } = useSelector((state) => state.playlist);

  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState(null); 

  const removeSong = async (id) => {
    if (!userData?.$id) return;
    setRemoving(id); 
    try {
      await dispatch(removeFromPlaylist({ songId: id, userId: userData.$id }));
    } finally {
      setRemoving(null); 
    }
  };

  useEffect(() => {
    if (!playlist.length) {
      setSongs([]);
      setLoading(false);
      return;
    }

    const fetchSongs = async () => {
      setLoading(true);
      try {
        const options = {
          method: "GET",
          headers: {
            "x-rapidapi-key": "b2cbd240dbmshd1e5d43c405eda5p164b15jsn319647e4a3a7",
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
          },
        };

        const fetchedSongs = await Promise.all(
          playlist.map(async (songId) => {
            const res = await fetch(
              `https://deezerdevs-deezer.p.rapidapi.com/track/${songId}`,
              options
            );
            return res.json();
          })
        );

        setSongs(fetchedSongs);
      } catch (err) {
        console.error("Error fetching songs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [playlist]);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        <LoaderPinwheel className="animate-spin inline-block mr-2" size={20} />
        Loading...
      </div>
    );
  }

  if (!songs.length) {
    return (
      <div className="text-center py-10 text-gray-400">Playlist is empty</div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      {songs.map((song) => (
        <div
          key={song.id}
          className="flex justify-between items-center gap-4 p-4 rounded-xl 
                     bg-white/10 backdrop-blur-md shadow-sm hover:shadow-lg 
                     hover:scale-[1.02] transition-all duration-200"
        >
          {song.album?.cover_medium && (
            <img
              src={song.album.cover_medium}
              alt={song.title}
              className="w-16 h-16 rounded-lg object-cover transform 
                         transition-transform duration-300 hover:scale-105"
            />
          )}

          <div className="flex flex-col">
            <p className="font-semibold text-gray-900">{song.title}</p>
            <p className="text-sm text-gray-700">{song.artist?.name}</p>
          </div>
          

          <button
            onClick={() => removeSong(song.id)}
            disabled={removing === song.id}
            className={`ml-auto px-3 py-1 rounded-md font-semibold shadow-sm transition
              ${
                removing === song.id
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-white text-red-600 hover:bg-red-100"
              }`}
          >
            {removing === song.id ? "Removing..." : "Remove"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default PlaylistCard;
