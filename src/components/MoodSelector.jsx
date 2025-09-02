const moods = [
  { label: "Bollywood", query: "bollywood" },
  { label: "Romantic", query: "arijit singh" },
  { label: "Sad", query: "sad hindi songs" },
  { label: "Party", query: "hindi party songs" },
  { label: "Devotional", query: "hanuman chalisa " }
];

export default function MoodSelector({ onSelectMood }) {
  return (
    <div className="flex justify-center gap-3 mb-6 flex-wrap">
      {moods.map((mood) => (

     <button
  key={mood.label}
  onClick={() => onSelectMood(mood.query)}
  className="px-4 py-2 bg-transparent text-white rounded-full 
             shadow-2xl drop-shadow-2xl 
             border border-transparent 
             hover:border-white hover:shadow-[0_0.5px_1px_rgba(0,0,0,0.4)] 
             transition-all duration-300 ease-in-out"
>
  {mood.label}
</button>

      ))}
    </div>
  );
}
