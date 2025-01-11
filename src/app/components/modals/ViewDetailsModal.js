export default function ViewDetailsModal({ show, onClose, recipe }) {
  if (!show || !recipe) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">{recipe.recipeName}</h2>
          
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold dark:text-white">{recipe.details.name}</h1>
              <div className="grid grid-cols-2 gap-4 mt-2 mb-0 text-gray-600 dark:text-gray-300">
                <div>🕒 Cooking Time:  {recipe.details.cookingTime}</div>
                <div>👥 Servings: {recipe.details.servings}</div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2  dark:text-white">Ingredients</h3>
              <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
                {recipe.details.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 dark:text-white">Instructions</h3>
              <ol className="list-decimal pl-5 text-gray-600 dark:text-gray-300">
                {recipe.details.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>

            {recipe.notes && (
              <div>
                <h3 className="text-lg font-semibold mb-2 dark:text-white">Notes</h3>
                <p className="text-gray-600 dark:text-gray-300">{recipe.notes}</p>
              </div>
            )}
          </div>
        </div>
        <div className="border-t p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
} 