import React, { useState, useEffect } from "react";
import { FaSearch, FaBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";

const RecipeManagement = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDietType, setSelectedDietType] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState([]);

  const API_URL = "http://127.0.0.1:8000/recipes";

  useEffect(() => {
    fetch(`${API_URL}`)
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRecipes = recipes.filter(
    (recipe) =>
      (recipe.dietType === selectedDietType || selectedDietType === "All") &&
      (recipe.countryOfOrigin === selectedCountry ||
        selectedCountry === "All") &&
      (recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.chefName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDietTypeChange = (diet) => {
    setSelectedDietType(diet);
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const toggleBookmark = (recipeId) => {
    setBookmarkedRecipes((prevBookmarks) => {
      if (prevBookmarks.includes(recipeId)) {
        return prevBookmarks.filter((id) => id !== recipeId);
      } else {
        return [...prevBookmarks, recipeId];
      }
    });
  };

  const dietTypes = [
    "All",
    "Vegan",
    "Dash",
    "Keto",
    "Atkins",
    "Pescatarian",
    "Gluten-Free",
  ];

  const countries = [
    "All",
    ...new Set(recipes.map((recipe) => recipe.countryOfOrigin)),
  ];

  return (
    <div className="bg-green-50 min-h-screen p-8 font-urbanist">
      <h1 className="text-4xl font-bold text-center mb-12 text-black">
        Manage Recipes
      </h1>

      {/* Categories Filter */}
      <div className="flex justify-center space-x-4 mb-8">
        {dietTypes.map((diet) => (
          <button
            key={diet}
            className={`px-6 py-3 ${
              selectedDietType === diet
                ? "bg-green-600 text-white"
                : "bg-white text-green-600"
            } rounded-full shadow-lg transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50`}
            onClick={() => handleDietTypeChange(diet)}
          >
            {diet}
          </button>
        ))}
      </div>

      {/* Search Bar and Country Filter */}
      <div className="flex justify-between items-center mb-8">
        <div className="relative w-full max-w-xl">
          <input
            type="text"
            placeholder="Search recipes or chefs..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-6 py-3 pl-12 pr-10 text-green-600 bg-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-600" />
        </div>
        <div className="flex items-center">
          <label
            htmlFor="country-select"
            className="mr-4 text-green-600 font-semibold text-lg"
          >
            Select Country:
          </label>
          <select
            id="country-select"
            className="px-6 py-3 bg-white text-green-600 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 cursor-pointer"
            value={selectedCountry}
            onChange={handleCountryChange}
          >
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Recipe Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="transform transition duration-300 hover:scale-105 bg-white rounded-xl shadow-xl overflow-hidden"
          >
            <div className="relative h-64">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 right-0 bg-green-600 text-white px-3 py-1 rounded-bl-lg">
                {recipe.dietType}
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-2xl font-bold text-green-800">
                  {recipe.title}
                </h3>
                <FaBookmark
                  className={`text-2xl cursor-pointer ${
                    bookmarkedRecipes.includes(recipe.id)
                      ? "text-blue-500"
                      : "text-gray-400"
                  }`}
                  onClick={() => toggleBookmark(recipe.id)}
                />
              </div>
              <div className="flex items-center mb-4">
                <img
                  src={recipe.chefImage}
                  alt={recipe.chefName}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <span className="text-gray-600">{recipe.chefName}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span>Prep Time: {recipe.prepTime}</span>
                <span>Servings: {recipe.servings}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-yellow-500">★ {recipe.rating}</span>
                <span className="text-green-600">{recipe.countryOfOrigin}</span>
              </div>
              <Link
                to={`/recipes/${recipe.id}`}
                className="mt-4 block w-full text-center bg-green-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              >
                View Recipe
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeManagement;

