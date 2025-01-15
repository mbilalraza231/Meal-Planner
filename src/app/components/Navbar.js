"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleRecipesClick = async (e) => {
    e.preventDefault();
    
    // If we're not on the home page, navigate to home first
    if (window.location.pathname !== '/') {
      await router.push('/');
      // Increase the delay to ensure the page is fully loaded
      setTimeout(() => {
        const allRecipesSection = document.getElementById('all-recipes');
        if (allRecipesSection) {
          const navbarHeight = document.querySelector('nav').offsetHeight;
          const offset = 20;
          const topPosition = allRecipesSection.offsetTop - navbarHeight - offset;
          window.scrollTo({ 
            top: topPosition, 
            behavior: 'instant' 
          });
        }
      }, 500); // Increased delay to 500ms
    } else {
      // If already on home page, just scroll
      const allRecipesSection = document.getElementById('all-recipes');
      if (allRecipesSection) {
        const navbarHeight = document.querySelector('nav').offsetHeight;
        const offset = 20;
        const topPosition = allRecipesSection.offsetTop - navbarHeight - offset;
        window.scrollTo({ 
          top: topPosition, 
          behavior: 'instant' 
        });
      }
    }
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400"
          >
            MealPlanner
          </Link>

          <button
            className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-indigo-400 transition-colors">
              Home
            </Link>
            <button
              className="hover:text-indigo-400 transition-colors"
              onClick={handleRecipesClick}
            >
              Recipes
            </button>
            <Link
              href="/meal-planner"
              className="hover:text-indigo-400 transition-colors"
            >
              Meal Planner
            </Link>
          </div>
        </div>

        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="flex flex-col space-y-4 py-4">
            <Link
              href="/"
              className="hover:text-indigo-400 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <button
              className="hover:text-indigo-400 transition-colors py-2"
              onClick={handleRecipesClick}
            >
              Recipes
            </button>
            <Link
              href="/meal-planner"
              className="hover:text-indigo-400 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Meal Planner
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
