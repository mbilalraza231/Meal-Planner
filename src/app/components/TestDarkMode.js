"use client";

import { useTheme } from "../context/ThemeContext";

export default function TestDarkMode() {
  const { darkMode } = useTheme();

  return (
    <div className="p-4 m-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      {/* Removed the Current Theme text display */}
    </div>
  );
}
