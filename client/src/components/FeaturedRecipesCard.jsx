import React, { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaHeart,
  FaComment,
  FaStar,
  FaBookmark,
  FaClock,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const RecipeCard = ({ recipe }) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const toggleLike = (e) => {
    e.preventDefault();
    setLiked(!liked);
  };
  const toggleBookmark = (e) => {
    e.preventDefault();
    setBookmarked(!bookmarked);
  };

  const handleCommentClick = () => {
    window.location.href = `/recipe-info/${recipe.id}`;
  };

  const handleShare = (platform) => {
    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          recipe.url
        )}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          recipe.url
        )}&text=${encodeURIComponent(recipe.title)}`;
        break;
      case "instagram":
        // Instagram doesn't have a direct sharing URL, so we'll open Instagram's homepage
        shareUrl = "https://www.instagram.com/";
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(
          `Check out this recipe: ${recipe.title} ${recipe.url}`
        )}`;
        break;
      default:
        break;
    }
    if (shareUrl) {
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} className="text-yellow-400" />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <FaStar className="text-gray-300" />
            <div
              className="absolute top-0 left-0 overflow-hidden"
              style={{ width: "50%" }}
            >
              <FaStar className="text-yellow-400" />
            </div>
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <FaStar key={`empty-${i}`} className="text-gray-300" />
        ))}
      </>
    );
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-2xl p-8 flex flex-col h-full relative transition-all duration-300 ease-in-out hover:shadow-3xl hover:scale-105 border border-green-200 hover:border-green-300 w-full max-w-3xl mx-auto">
      {/* Recipe Header */}
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={recipe.chefImage}
          alt="Chef"
          className="w-16 h-16 rounded-full border-2 border-green-400 shadow-md"
        />
        <div>
          <h1 className="text-2xl font-bold text-green-800">{recipe.title}</h1>
          <p className="text-sm text-green-600">
            by <span className="font-semibold">{recipe.chefName}</span>
          </p>
        </div>
      </div>

      {/* Recipe Image */}
      <div className="mb-6 relative overflow-hidden rounded-xl">
        <img
          src={recipe.image}
          alt="Recipe"
          className="w-full h-56 object-cover shadow-lg transition-transform duration-300 ease-in-out hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full px-3 py-1 text-sm font-semibold text-green-700">
          <FaClock className="inline mr-1" /> {recipe.prepTime}
        </div>
      </div>

      {/* Recipe Details */}
      <div className="mb-6 text-sm text-grey space-y-3 flex-grow">
        <p className="flex justify-between">
          <span className="font-semibold">Diet Type:</span> {recipe.dietType}
        </p>
        <p className="flex justify-between">
          <span className="font-semibold">Servings:</span> {recipe.servings}
        </p>
        <p className="flex justify-between">
          <span className="font-semibold">Country of Origin:</span>{" "}
          {recipe.countryOfOrigin}
        </p>
        <p>
          <span className="font-semibold">Ingredients:</span>{" "}
          {recipe.ingredients}
        </p>
        <p>
          <span className="font-semibold">Instructions:</span>{" "}
          {recipe.instructions}
        </p>

        <a
          href={`/recipeinfo/${recipe.id}`}
          className="text-green-500 hover:text-green-600 text-xs block mt-2 underline"
        >
          View More Recipe Info
        </a>
      </div>

      {/* Likes, Ratings, and Bookmark */}
      <div className="flex items-center justify-between mb-6 bg-green-50 p-3 rounded-lg">
        <button
          onClick={toggleLike}
          className={`flex items-center space-x-2 ${
            liked ? "text-red-500" : "text-gray-500"
          } hover:text-red-600 transition-colors duration-200`}
        >
          <FaHeart className="text-xl" />
          <span>{liked ? "Liked" : "Like"}</span>
        </button>
        <div className="flex items-center space-x-1">
          <div className="flex">{renderStars(recipe.rating)}</div>
          <span className="font-semibold">{recipe.rating.toFixed(1)}</span>
          <span className="text-gray-500">
            ({recipe.numberOfRatings} ratings)
          </span>
        </div>
        <button
          onClick={toggleBookmark}
          className={`${
            bookmarked ? "text-blue-500" : "text-gray-500"
          } group relative hover:text-blue-600 transition-colors duration-200`}
        >
          <FaBookmark className="text-xl" />
          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {bookmarked ? "Bookmarked" : "Bookmark"}
          </span>
        </button>
        <a
          href={`/recipe-info/${recipe.id}`}
          className="text-gray-500 hover:text-green-600 transition-colors duration-200 group relative"
        >
          <FaComment className="text-xl" />
          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Comment
          </span>
        </a>
      </div>

      {/* Social Media Share Buttons */}
      <div className="absolute bottom-4 right-4 flex space-x-4">
        <button
          onClick={() => handleShare("facebook")}
          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          <FaFacebookF className="text-xl" />
        </button>
        <button
          onClick={() => handleShare("twitter")}
          className="text-black hover:text-gray-700 transition-colors duration-200"
        >
          <FaXTwitter className="text-xl" />
        </button>
        <button
          onClick={() => handleShare("instagram")}
          className="text-pink-600 hover:text-pink-800 transition-colors duration-200"
        >
          <FaInstagram className="text-xl" />
        </button>
        <button
          onClick={() => handleShare("whatsapp")}
          className="text-green-600 hover:text-green-800 transition-colors duration-200"
        >
          <FaWhatsapp className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
