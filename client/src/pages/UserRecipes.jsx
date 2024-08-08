import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import recipesData from '../data/recipes.json'; // Import the JSON file
import { FaArrowRight, FaArrowUp, FaPlus, FaUpload } from "react-icons/fa";
// import navbar
// import footer

const UserRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [showAll, setShowAll] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [formImage, setFormImage] = useState(null);

  useEffect(() => {
    setRecipes(recipesData);
  }, []);

  const handleViewMore = () => {
    if (showAll) {
      setVisibleCount(8);
      setShowAll(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setVisibleCount(recipes.length);
      setShowAll(true);
    }
  };

  const handleAddRecipeClick = () => {
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleFormImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleUploadClick = () => {
    document.getElementById('formFileInput').click();
  };

  return (
    <div className="bg-green-50 min-h-screen p-8 font-urbanist relative">
      <h2 className="text-3xl font-semibold text-center mb-8">User Recipes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {recipes.slice(0, visibleCount).map((recipe, index) => (
          <RecipeCard
            key={index}
            title={recipe.title}
            image={recipe.image}
            rating={recipe.rating}
          />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={handleViewMore}
          className="bg-orange-500 text-white font-bold py-2 px-4 rounded-full flex items-center shadow-lg hover:bg-orange-600"
        >
          {showAll ? 'Show Less' : 'View More Recipes'}
          <span className="ml-2 bg-white text-orange-500 rounded-full p-2">
            {showAll ? <FaArrowUp /> : <FaArrowRight />}
          </span>
        </button>
      </div>
      <div className="fixed bottom-8 right-8">
        <div className="relative group">
          <button
            onClick={handleAddRecipeClick}
            className="bg-orange-500 text-white font-bold p-4 rounded-full shadow-lg hover:bg-orange-600"
            aria-label="Add New Recipe"
          >
            <FaPlus />
          </button>
          <span className="absolute bottom-full right-1/2 transform translate-x-1/2 mb-2 w-max bg-black text-white text-xs font-semibold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            Add New Recipe
          </span>
        </div>
      </div>
      {isFormVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-green-50 p-8 rounded-lg shadow-lg w-full max-w-md h-3/4 overflow-y-auto">
            <h3 className="text-2xl font-semibold mb-4">Add New Recipe</h3>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Recipe Name</label>
                <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Serving</label>
                  <input type="number" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Prep Time</label>
                  <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Cook Time</label>
                  <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Ingredients</label>
                <textarea className="mt-1 block w-full p-2 border border-gray-300 rounded-md h-24"></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Directions</label>
                <textarea className="mt-1 block w-full p-2 border border-gray-300 rounded-md h-24"></textarea>
              </div>
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Diet Type</label>
                  <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md max-h-48 overflow-y-auto">
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="dairy-free">Dairy-Free</option>
                    <option value="gluten-free">Gluten-Free</option>
                    <option value="low-carb">Low Carb</option>
                    {/* Add more diet types as needed */}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Country of Origin</label>
                  <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md max-h-48 overflow-y-auto">
                    <option value="kenyan">Kenyan</option>
                    <option value="indian">Indian</option>
                    <option value="italian">Italian</option>
                    <option value="mexican">Mexican</option>
                    <option value="chinese">Chinese</option>
                    <option value="american">American</option>
                    <option value="korean">Korean</option>
                    <option value="west african">West African</option>
                    <option value="ethopian">Ethopia</option>
                    {/* Add more countries as needed */}
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Upload Photo</label>
                <button
                  type="button"
                  onClick={handleUploadClick}
                  className="mt-2 bg-green-900 text-white px-4 py-2 rounded hover:bg-green-950 flex items-center"
                >
                  <FaUpload className="mr-2" />
                  Upload Photo
                </button>
                <input
                  type="file"
                  id="formFileInput"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFormImageChange}
                />
                {formImage && (
                  <div className="mt-2">
                    <img src={formImage} alt="Recipe" className="w-full h-auto rounded-md" />
                  </div>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="bg-gray-600 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-gray-700 mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-900 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-green-950"
                >
                  Add Recipe
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRecipes;
