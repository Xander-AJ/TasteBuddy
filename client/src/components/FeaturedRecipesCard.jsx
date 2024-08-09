import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaPinterestP, FaEnvelope, FaHeart, FaComment, FaStar, FaBookmark, FaClock } from 'react-icons/fa';

const RecipeCard = () => {
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [rating, setRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([
    { userImage: 'https://via.placeholder.com/50', userName: 'Alice', text: 'Great recipe!' },
    { userImage: 'https://via.placeholder.com/50', userName: 'Bob', text: 'I loved it!' },
    { userImage: 'https://via.placeholder.com/50', userName: 'Charlie', text: 'Will try this soon!' },
  ]);

  const toggleComments = () => setCommentsVisible(!commentsVisible);
  const toggleLike = () => setLiked(!liked);
  const toggleBookmark = () => setBookmarked(!bookmarked);

  const handleRating = (value) => setRating(value);
  const handleCommentChange = (e) => setNewComment(e.target.value);
  const handleSubmitComment = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, {
        userImage: 'https://via.placeholder.com/50',
        userName: 'You',
        text: newComment.trim()
      }]);
      setNewComment('');
      setCommentsVisible(true);
    }
  };

  const recipe = {
    chefImage: 'https://via.placeholder.com/150',
    title: 'Delicious Pasta Recipe',
    chefName: 'Chef John Doe',
    image: 'https://via.placeholder.com/800x600',
    ingredients: 'Pasta, Tomato Sauce, Cheese, Herbs',
    instructions: 'Cook pasta, add sauce, sprinkle cheese, and garnish with herbs',
    url: 'https://example.com/recipe',
    moreInfoUrl: 'https://example.com/recipe-details',
    rating: 4.5,
    prepTime: '30 minutes',
    servings: 4,
    countryOfOrigin: 'Italy',
    dietType: 'Vegetarian',
  };

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Recipe Header */}
        <div className="flex items-center space-x-4 mb-4">
          <img src={recipe.chefImage} alt="Chef" className="w-12 h-12 rounded-full border border-gray-300" />
          <div>
            <h1 className="text-xl font-bold text-gray-800">{recipe.title}</h1>
            <p className="text-sm text-gray-600">by <span className="font-semibold">{recipe.chefName}</span></p>
          </div>
        </div>

        {/* Recipe Image */}
        <div className="mb-4">
          <img src={recipe.image} alt="Recipe" className="w-full h-56 object-cover rounded-lg" />
        </div>

        {/* Recipe Details */}
        <div className="mb-4 text-sm text-gray-700 space-y-2">
          <p><span className="font-semibold">Diet Type:</span> {recipe.dietType}  |  <span className="font-semibold"><FaClock className="inline" /> </span> {recipe.prepTime}</p>
          <p><span className="font-semibold">Servings:</span> {recipe.servings}  |  <span className="font-semibold">Country of Origin:</span> {recipe.countryOfOrigin}</p>
          <p><span className="font-semibold">Ingredients:</span> {recipe.ingredients.slice(0, 50)}...</p>
          <p><span className="font-semibold">Instructions:</span> {recipe.instructions.slice(0, 50)}...</p>
          <a href={recipe.moreInfoUrl} className="text-blue-600 hover:text-blue-800 text-xs block mt-2" target="_blank" rel="noopener noreferrer">
            View More Recipe Info
          </a>
        </div>

        {/* Likes, Ratings, and Bookmark */}
        <div className="flex items-center justify-between mb-4">

          <button onClick={toggleLike} className={`flex items-center space-x-2 ${liked ? 'text-red-500' : 'text-gray-500'}`}>
            <FaHeart className="text-xl" />
            <span>{liked ? 'Liked' : 'Like'}</span>
          </button>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}

                className={`cursor-pointer text-xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                onClick={() => handleRating(star)}
              />
            ))}
            <span className="ml-2">{rating > 0 ? rating.toFixed(1) : recipe.rating.toFixed(1)}</span>
          </div>
          <button
            onClick={toggleBookmark}

            className={`${bookmarked ? 'text-blue-500' : 'text-gray-500'} group relative`}
          >
            <FaBookmark className="text-xl" />
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {bookmarked ? 'Bookmarked' : 'Bookmark'}
            </span>
          </button>
        </div>

        {/* Comments Section */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Comments</h3>
          <div className="space-y-3">
            {comments.slice(0, commentsVisible ? comments.length : 1).map((comment, index) => (
              <div key={index} className="flex items-start space-x-3">
                <img src={comment.userImage} alt="User" className="w-10 h-10 rounded-full border border-gray-300" />
                <div>
                  <p className="font-semibold text-sm">{comment.userName}</p>
                  <p className="text-sm text-gray-600">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
          {comments.length > 1 && (
            <button
              onClick={toggleComments}
              className="mt-2 inline-block text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
            >
              {commentsVisible ? 'View Less Comments' : 'View More Comments'}
            </button>
          )}
          <div className="mt-3">
            <textarea
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Add a comment..."
              className="w-full p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
            <button
              onClick={handleSubmitComment}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Post Comment
            </button>
          </div>
        </div>

        {/* Social Media Share Buttons */}
        <div className="flex space-x-4">

          <a href={`https://www.facebook.com/sharer/sharer.php?u=${recipe.url}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
            <FaFacebookF className="text-xl" />
          </a>

          <a href={`https://twitter.com/intent/tweet?url=${recipe.url}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
            <FaTwitter className="text-xl" />
          </a>

          <a href={`https://www.pinterest.com/pin/create/button/?url=${recipe.url}`} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800">
            <FaPinterestP className="text-xl" />
          </a>

          <a href={`mailto:?subject=Check out this recipe&body=Here's a great recipe I found: ${recipe.url}`} className="text-gray-600 hover:text-gray-800">
            <FaEnvelope className="text-xl" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;