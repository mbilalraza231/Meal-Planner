export default function SearchBar({ onSearch }) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for recipes..."
          className="w-full px-4 md:px-6 py-3 md:py-4 rounded-full bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base"
        />
        <button
          onClick={onSearch}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 md:px-6 py-1.5 md:py-2 rounded-full text-sm md:text-base font-semibold hover:bg-indigo-700 transition-colors"
        >
          Search
        </button>
      </div>
    </div>
  );
}
