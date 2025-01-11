// src/app/layout.js
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from './context/ThemeContext';
//import { dbConnect } from '@/db/connectDb';

// Initialize database connection at startup
// if (process.env.NODE_ENV !== 'production') {
//   dbConnect();
// }

export const metadata = {
  title: "Recipe Finder and Meal Planner",
  description: "Find recipes, plan meals, and make cooking easier.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="min-h-screen bg-gray-900 text-gray-100">
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
