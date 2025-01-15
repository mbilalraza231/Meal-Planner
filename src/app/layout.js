
"use client";

import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";



export default function RootLayout({ children }) {
  const handleScrollToAllRecipes = () => {
    const allRecipesSection = document.getElementById('all-recipes');
    if (allRecipesSection) {
      allRecipesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="min-h-screen bg-gray-900 text-gray-100">
        
          <div className="flex flex-col min-h-screen">
            <Navbar onScrollToAllRecipes={handleScrollToAllRecipes} />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        
      </body>
    </html>
  );
}
