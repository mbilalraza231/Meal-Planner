export default function Welcome() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 py-12 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Your Personal
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
              Meal Planning
            </span>
            Assistant
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
            Discover delicious recipes, plan your meals effortlessly, and make
            cooking an enjoyable experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-indigo-600 px-6 md:px-8 py-3 rounded-full hover:bg-gray-100 transition-all text-base md:text-lg font-semibold">
              Get Started
            </button>
            <button className="bg-indigo-600 text-white px-6 md:px-8 py-3 rounded-full hover:bg-indigo-700 transition-all text-base md:text-lg font-semibold">
              Browse Recipes
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 