import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const RecipeCard = ({ id, title, image, rating, onDelete }) => {
  const navigate = useNavigate();

  // generate stars based on the rating
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-6 h-6 ${i <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927C9.316 2.282 10.684 2.282 10.951 2.927L12.221 6.25H15.5C16.194 6.25 16.479 7.105 15.957 7.553L13.305 9.879L14.575 13.196C14.842 13.841 14.158 14.436 13.635 13.988L10.982 11.662L8.329 13.988C7.806 14.436 7.122 13.841 7.389 13.196L8.659 9.879L6.007 7.553C5.485 7.105 5.771 6.25 6.464 6.25H9.743L11.013 2.927Z"/>
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="bg-green-100 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col font-urbanist">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex">{renderStars()}</div>
        <div className="flex-grow"></div>
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <button
              onClick={() => onDelete(id)}
              className="p-2 text-red-500 hover:text-red-700"
              title="Delete recipe"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <button
              onClick={() => navigate(`/recipes/${id}/edit`)}
              className="p-2 text-green-400 hover:text-customGreen"
              title="Edit recipe"
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
          </div>
          <button
            onClick={() => navigate(`/recipes/${id}`)}
            className="mt-2 px-4 py-2 bg-green-100 text-black border-2 border-black rounded-full hover:bg-customGreen self-end"
          >
            View Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
