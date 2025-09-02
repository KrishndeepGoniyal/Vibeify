import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [term, setTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term.trim()) {
      onSearch(term);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center mb-4">
      <input
        type="text"
        placeholder="Search for songs or artists..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="w-1/2 p-2 border rounded-l-lg focus:outline-none"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600"
      >
        Search
      </button>
    </form>
  );
}
