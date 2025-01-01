"use client";

import { useTheme } from "../context/ThemeContext";

export default function ThemeToggleButton() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`px-4 py-2 rounded transition duration-300 
        ${darkMode ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}
        hover:${darkMode ? 'bg-blue-500' : 'bg-gray-300'}`}
    >
      {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </button>
  );
} 