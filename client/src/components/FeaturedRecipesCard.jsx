import React, { useState } from 'react';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaHeart, FaComment, FaStar, FaBookmark, FaClock } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const RecipeCard = () => {

  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [rating, setRating] = useState(0);

  const recipe = {
    chefImage: 'https://img.freepik.com/free-photo/young-african-american-woman-isolated-yellow-studio-background-facial-expression-beautiful-female-close-up-portrait-concept-human-emotions-facial-expression-smiling-keeping-calm_155003-25193.jpg?t=st=1723163379~exp=1723166979~hmac=eb8050034805c34763f392d47e5458b872844231636ae21810f4e327c1250260&w=360',
    title: 'Delicious Pasta Recipe',
    chefName: 'Wanane Nane',
    image: 'https://img.freepik.com/premium-photo/bowl-pasta-with-bowl-tomato-sauce-basil_1246444-1166.jpg?w=740',
    ingredients: 'Pasta, Tomato Sauce, Cheese, Herbs',
    instructions: 'Cook pasta, add sauce, sprinkle cheese, and garnish with herbs...',
    url: 'https://example.com/recipe',
    moreInfoUrl: 'https://example.com/recipe-details',
    rating: 4.5,
    prepTime: '30 minutes',
    servings: 4,
    countryOfOrigin: 'Italy',
    dietType: 'Vegetarian',
  };

  const toggleLike = () => setLiked(!liked);
  const toggleBookmark = () => setBookmarked(!bookmarked);
  const handleRating = (value) => setRating(value);

  const handleCommentClick = () => {
    window.open(`${recipe.moreInfoUrl}#comments`, '_blank');
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-2xl p-8 flex flex-col h-full relative transition-all duration-300 ease-in-out hover:shadow-3xl hover:scale-105 border border-green-200 hover:border-green-300">
      {/* Recipe Header */}
      <div className="flex items-center space-x-4 mb-6">
        <img src={recipe.chefImage} alt="Chef" className="w-16 h-16 rounded-full border-2 border-green-400 shadow-md" />
        <div>
          <h1 className="text-2xl font-bold text-green-800">{recipe.title}</h1>
          <p className="text-sm text-green-600">by <span className="font-semibold">{recipe.chefName}</span></p>
        </div>
      </div>

      {/* Recipe Image */}


      <div className="mb-6 relative overflow-hidden rounded-xl">
        <img src={recipe.image} alt="Recipe" className="w-full h-56 object-cover shadow-lg transition-transform duration-300 ease-in-out hover:scale-110" />
        <div className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full px-3 py-1 text-sm font-semibold text-green-700">
          <FaClock className="inline mr-1" /> {recipe.prepTime}
        </div>
      </div>

      {/* Recipe Details */}
      <div className="mb-6 text-sm text-green-700 space-y-3 flex-grow">
        <p className="flex justify-between"><span className="font-semibold">Diet Type:</span> {recipe.dietType}</p>
        <p className="flex justify-between"><span className="font-semibold">Servings:</span> {recipe.servings}</p>
        <p className="flex justify-between"><span className="font-semibold">Country of Origin:</span> {recipe.countryOfOrigin}</p>
        <p><span className="font-semibold">Ingredients:</span> {recipe.ingredients}</p>
        <p><span className="font-semibold">Instructions:</span> {recipe.instructions}</p>

        <a href={recipe.moreInfoUrl} className="text-green-500 hover:text-green-600 text-xs block mt-2 underline" target="_blank" rel="noopener noreferrer">
          View More Recipe Info
        </a>
      </div>

      {/* Likes, Ratings, and Bookmark */}
      <div className="flex items-center justify-between mb-6 bg-green-50 p-3 rounded-lg">
        <button onClick={toggleLike} className={`flex items-center space-x-2 ${liked ? 'text-red-500' : 'text-gray-500'} hover:text-red-600 transition-colors duration-200`}>
          <FaHeart className="text-xl" />
          <span>{liked ? 'Liked' : 'Like'}</span>
        </button>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`cursor-pointer text-xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-500 transition-colors duration-200`}
              onClick={() => handleRating(star)}
            />
          ))}
          <span className="ml-2 font-semibold">{rating > 0 ? rating.toFixed(1) : recipe.rating.toFixed(1)}</span>
        </div>
        <button
          onClick={toggleBookmark}
          className={`${bookmarked ? 'text-blue-500' : 'text-gray-500'} group relative hover:text-blue-600 transition-colors duration-200`}
        >
          <FaBookmark className="text-xl" />
          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {bookmarked ? 'Bookmarked' : 'Bookmark'}
          </span>
        </button>
        <button
          onClick={handleCommentClick}
          className="text-gray-500 hover:text-green-600 transition-colors duration-200 group relative"
        >
          <FaComment className="text-xl" />
          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Comment
          </span>
        </button>
      </div>

      {/* Social Media Share Buttons */}
      <div className="absolute bottom-4 right-4 flex space-x-4">
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${recipe.url}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
          <FaFacebookF className="text-xl" />
        </a>
        <a href={`https://x.com/intent/tweet?url=${recipe.url}`} target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-700 transition-colors duration-200">
          <FaXTwitter className="text-xl" />
        </a>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800 transition-colors duration-200">
          <FaInstagram className="text-xl" />
        </a>
        <a href={`https://wa.me/?text=${encodeURIComponent(`Check out this recipe: ${recipe.url}`)}`} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 transition-colors duration-200">
          <FaWhatsapp className="text-xl" />
        </a>
      </div>
    </div>
  );
};

export default RecipeCard;