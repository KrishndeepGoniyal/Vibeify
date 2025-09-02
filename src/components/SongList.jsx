import SongCard from "./SongCard";

export default function SongList({ songs = [] }) {
  if (!songs.length) {
    return <p className="text-center text-gray-500 mt-4">No songs found</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {songs.map((song) => (
        <div key={song.id} className="relative w-full flex justify-center">
          <SongCard song={song} />
        </div>
      ))}
    </div>
  );
}
