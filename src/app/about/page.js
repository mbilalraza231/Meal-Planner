"use client";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-gray-800 rounded-xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            Our Team
          </h1>
          
          <div className="space-y-6 text-gray-300">
            <p className="text-center mb-12">
              Meet the talented team behind MealPlanner, working together to make your meal planning experience better.
            </p>

            {/* Team Members Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Frontend Developer */}
              <div className="bg-gray-700 p-6 rounded-lg text-center transform hover:scale-105 transition-transform">
                <div className="text-3xl mb-4">👨‍💻</div>
                <h3 className="text-xl font-semibold text-white mb-2">M. Salman Akram</h3>
                <p className="text-sm text-gray-300 mb-2">22-NTU-CS-1306</p>
                <p className="text-indigo-400 font-medium">Frontend Development</p>
              </div>

              {/* Backend Developer */}
              <div className="bg-gray-700 p-6 rounded-lg text-center transform hover:scale-105 transition-transform">
                <div className="text-3xl mb-4">⚙️</div>
                <h3 className="text-xl font-semibold text-white mb-2">M. Bilal Raza</h3>
                <p className="text-sm text-gray-300 mb-2">22-NTU-CS-1296</p>
                <p className="text-indigo-400 font-medium">API & Database</p>
              </div>

              {/* Documentation */}
              <div className="bg-gray-700 p-6 rounded-lg text-center transform hover:scale-105 transition-transform">
                <div className="text-3xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-white mb-2">M. Fayyaz Ahmed</h3>
                <p className="text-sm text-gray-300 mb-2">22-NTU-CS-1297</p>
                <p className="text-indigo-400 font-medium">Documentation & Database Schema</p>
              </div>
            </div>

            {/* Project Description */}
            <div className="mt-12 pt-8 border-t border-gray-700">
              <h2 className="text-2xl font-semibold text-white mb-4">
                About The Project
              </h2>
              <p className="mb-6">
                MealPlanner is a comprehensive web application developed as part of our coursework at NTU. 
                Our team has worked collaboratively to create a user-friendly platform that helps users plan 
                their meals efficiently.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-2">Frontend</h3>
                  <p className="text-sm">Modern UI built with Next.js and Tailwind CSS for a seamless user experience</p>
                </div>
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-2">Backend</h3>
                  <p className="text-sm">Robust API and database architecture ensuring reliable data management</p>
                </div>
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-2">Documentation & Database Schema</h3>
                  <p className="text-sm">Comprehensive documentation for maintainability and future development</p>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="mt-12 pt-8 border-t border-gray-700 text-center">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Contact Us
              </h2>
              <p className="max-w-xl mx-auto">
                Have questions about our project? Feel free to reach out to our team at{' '}
                <a href="mailto:contact@mealplanner.com" className="text-indigo-400 hover:text-indigo-300">
                  contact@xyz.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 