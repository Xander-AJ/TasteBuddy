import React from "react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe, shareOnSocialMedia }) => {
  const handleShare = (platform) => {
    let url = "";
    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          window.location.href
        )}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          window.location.href
        )}&text=${encodeURIComponent(recipe.title)}`;
        break;

      case "instagram":
        // Note: Instagram doesn't have a direct sharing URL, so this might need to be handled differently
        url = `https://www.instagram.com/`;
        break;
      case "whatsapp":
        url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          recipe.title + " " + window.location.href
        )}`;
        break;
      default:
        break;
    }
    if (url) {
      window.open(url, "_blank");
    }
  };

  return (
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
        <h3 className="text-2xl font-bold mb-2 text-green-800">
          {recipe.title}
        </h3>
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
        <div className="mt-4 flex justify-end space-x-4">
          <FaFacebook
            className="text-blue-600 cursor-pointer text-xl hover:text-blue-800 transition-colors duration-300"
            onClick={() => handleShare("facebook")}
          />
          <FaXTwitter
            className="text-black cursor-pointer text-xl hover:text-gray-700 transition-colors duration-300"
            onClick={() => handleShare("twitter")}
          />

          <FaInstagram
            className="text-pink-600 cursor-pointer text-xl hover:text-pink-800 transition-colors duration-300"
            onClick={() => handleShare("instagram")}
          />
          <FaWhatsapp
            className="text-green-500 cursor-pointer text-xl hover:text-green-700 transition-colors duration-300"
            onClick={() => handleShare("whatsapp")}
          />
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
