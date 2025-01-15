"use client";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-gray-800 rounded-xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            About MealPlanner
          </h1>
          
          <div className="space-y-6 text-gray-300">
            <p>
              Welcome to MealPlanner, your ultimate companion for organizing and planning your meals. 
              We believe that good food brings people together, and planning your meals should be an 
              enjoyable experience.
            </p>

            <div className="border-l-4 border-indigo-500 pl-4 my-8">
              <p className="text-xl font-medium text-white">
                "Our mission is to make meal planning simple, enjoyable, and accessible to everyone."
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              What We Offer
            </h2>
            <ul className="list-disc list-inside space-y-3">
              <li>Extensive collection of curated recipes</li>
              <li>Easy-to-use meal planning tools</li>
              <li>Customizable weekly meal schedules</li>
              <li>Smart recipe search and filtering</li>
              <li>Detailed cooking instructions and ingredients lists</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              Our Values
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mt-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-2">Simplicity</h3>
                <p className="text-sm">Making meal planning straightforward and stress-free</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-2">Quality</h3>
                <p className="text-sm">Ensuring high-quality recipes and user experience</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-2">Community</h3>
                <p className="text-sm">Building a community of food enthusiasts</p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              Contact Us
            </h2>
            <p>
              Have questions or suggestions? We'd love to hear from you! Reach out to us at{' '}
              <a href="mailto:contact@mealplanner.com" className="text-indigo-400 hover:text-indigo-300">
                contact@mealplanner.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 