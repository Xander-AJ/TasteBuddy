import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import recipesData from '../data/recipes.json';
import { FaArrowRight, FaArrowUp, FaPlus, FaUpload } from "react-icons/fa";

const UserRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [showAll, setShowAll] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [formImage, setFormImage] = useState(null);
  const [newRecipe, setNewRecipe] = useState({
    title: '',
    servings: '',
    prepTime: '',
    cookTime: '',
    ingredients: '',
    instructions: '',
    dietType: 'vegetarian',
    countryOfOrigin: 'kenyan',
    image: null,
    rating: 0
  });

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
    setNewRecipe({
      title: '',
      servings: '',
      prepTime: '',
      cookTime: '',
      ingredients: '',
      instructions: '',
      dietType: 'vegetarian',
      countryOfOrigin: 'kenyan',
      image: null,
      rating: 0
    });
    setFormImage(null);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleFormImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setFormImage(imageUrl);
      setNewRecipe({ ...newRecipe, image: imageUrl });
    }
  };

  const handleUploadClick = () => {
    document.getElementById('formFileInput').click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe({ ...newRecipe, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const addedRecipe = { ...newRecipe, id: recipes.length + 1 };
    setRecipes([...recipes, addedRecipe]);
    handleCloseForm();
  };

  const handleDeleteRecipe = (id) => {

    setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== id));
  };

  return (
    <div className="bg-green-50 min-h-screen p-8 font-urbanist relative">
      <h2 className="text-4xl font-bold text-center mb-12 text-green-800">User Recipes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {recipes.slice(0, visibleCount).map((recipe) => (
          <RecipeCard
            key={recipe.id}
            title={recipe.title}
            image={recipe.image}
            rating={recipe.rating}
            onDelete={() => handleDeleteRecipe(recipe.id)}
          />
        ))}
      </div>
      <div className="flex justify-center mt-12">
        <button
          onClick={handleViewMore}
          className="bg-orange-500 text-white font-bold py-3 px-6 rounded-full flex items-center shadow-lg hover:bg-orange-600 transition duration-300"
        >
          {showAll ? 'Show Less' : 'View More Recipes'}
          <span className="ml-3 bg-white text-orange-500 rounded-full p-2">
            {showAll ? <FaArrowUp /> : <FaArrowRight />}
          </span>
        </button>
      </div>
      <div className="fixed bottom-8 right-8">
        <div className="relative group">
          <button
            onClick={handleAddRecipeClick}
            className="bg-orange-500 text-white font-bold p-4 rounded-full shadow-lg hover:bg-orange-600 transition duration-300"
            aria-label="Add New Recipe"
          >
            <FaPlus className="text-xl" />
          </button>
          <span className="absolute bottom-full right-1/2 transform translate-x-1/2 mb-2 w-max bg-black text-white text-xs font-semibold py-2 px-3 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Add New Recipe
          </span>
        </div>
      </div>
      {isFormVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-green-50 p-8 rounded-lg shadow-2xl w-full max-w-md h-3/4 overflow-y-auto">
            <h3 className="text-3xl font-bold mb-6 text-green-800 text-center">Add New Recipe</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Recipe Name</label>
                <input type="text" name="title" value={newRecipe.title} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300 hover:border-green-300" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Servings</label>
                  <input type="number" name="servings" value={newRecipe.servings} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300 hover:border-green-300" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prep Time</label>
                  <input type="text" name="prepTime" value={newRecipe.prepTime} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300 hover:border-green-300" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cook Time</label>
                  <input type="text" name="cookTime" value={newRecipe.cookTime} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300 hover:border-green-300" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients</label>
                <textarea name="ingredients" value={newRecipe.ingredients} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-md h-24 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300 hover:border-green-300 resize-none"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
                <textarea name="instructions" value={newRecipe.instructions} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-md h-24 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300 hover:border-green-300 resize-none"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Diet Type</label>
                  <select name="dietType" value={newRecipe.dietType} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300 hover:border-green-300 appearance-none bg-white">
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="dairy-free">Dairy-Free</option>
                    <option value="gluten-free">Gluten-Free</option>
                    <option value="low-carb">Low Carb</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country of Origin</label>
                  <select name="countryOfOrigin" value={newRecipe.countryOfOrigin} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300 hover:border-green-300 appearance-none bg-white">
                    <option value="kenyan">Kenyan</option>
                    <option value="indian">Indian</option>
                    <option value="italian">Italian</option>
                    <option value="mexican">Mexican</option>
                    <option value="chinese">Chinese</option>
                    <option value="american">American</option>
                    <option value="korean">Korean</option>
                    <option value="west african">West African</option>
                    <option value="ethiopian">Ethiopian</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photo</label>
                <button
                  type="button"
                  onClick={handleUploadClick}
                  className="w-full bg-green-600 text-white px-4 py-3 rounded-md hover:bg-green-700 transition duration-300 flex items-center justify-center shadow-md"
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
                  <div className="mt-4">
                    <img src={formImage} alt="Recipe" className="w-full h-auto rounded-md shadow-md object-cover" />
                  </div>
                )}
              </div>
              <div className="flex justify-end space-x-4 mt-8">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="bg-gray-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-gray-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
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