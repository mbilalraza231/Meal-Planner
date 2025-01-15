import { useState, useCallback } from 'react';

export default function SearchBar({ onSearch }) {
  const [searchInput, setSearchInput] = useState('');

  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    setSearchInput(value);
    onSearch(value);
  }, [onSearch]);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={searchInput}
          onChange={handleInputChange}
          placeholder="Search recipes..."
          className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          🔍
        </span>
      </div>
    </form>
  );
}
