export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 border-t border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              MealPlanner
            </h3>
            <p className="text-sm">
              Your personal assistant for meal planning and recipe discovery.
            </p>
          </div>
          <div>
            <h4 className="text-white text-md font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/recipes"
                  className="hover:text-white transition-colors"
                >
                  Recipes
                </a>
              </li>
              <li>
                <a
                  href="/meal-planner"
                  className="hover:text-white transition-colors"
                >
                  Meal Planner
                </a>
              </li>
              <li>
                <a
                  href="/shopping-list"
                  className="hover:text-white transition-colors"
                >
                  Shopping List
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-md font-semibold mb-4">
              Categories
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Breakfast
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Lunch
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Dinner
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Desserts
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-md font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>Email: info@mealplanner.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: 123 Cooking Street</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>
            &copy; {new Date().getFullYear()} MealPlanner. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
