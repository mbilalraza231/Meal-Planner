import { useRouter } from 'next/navigation';

export default function SearchResultCard({ recipe, searchTerm, onAddToMealPlan }) {
  const router = useRouter();

  const highlightText = (text, highlight) => {
    if (!highlight.trim()) return text;
    
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={i} className="bg-yellow-200 dark:bg-yellow-800">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <div className="flex items-center p-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {highlightText(recipe.title, searchTerm)}
          </h3>
          {recipe.cookingTime && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Cooking Time: {recipe.cookingTime}
            </p>
          )}
        </div>
        
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => router.push(`/recipes/${recipe._id}`)}
            className="px-4 py-2 text-sm font-medium bg-white text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-600 hover:text-white transition-colors"
          >
            View Details
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              onAddToMealPlan(recipe);
            }}
            className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Add to Plan
          </button>
        </div>
      </div>
    </div>
  );
}
