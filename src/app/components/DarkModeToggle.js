"use client";

import { useState } from "react";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="bg-gray-700 dark:bg-gray-300 text-white dark:text-gray-900 px-4 py-2 rounded-md hover:bg-gray-600 dark:hover:bg-gray-400"
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default DarkModeToggle;
