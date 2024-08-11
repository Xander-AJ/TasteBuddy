import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FeaturedRecipesCard from '../components/FeaturedRecipesCard';

const dummyData = [
{ id: 1, title: 'Recipe 1', description: 'Delicious recipe 1', imageUrl: 'path/to/image1.jpg' },
{ id: 2, title: 'Recipe 2', description: 'Delicious recipe 2', imageUrl: 'path/to/image2.jpg' },
{ id: 3, title: 'Recipe 3', description: 'Delicious recipe 3', imageUrl: 'path/to/image3.jpg' },
{ id: 4, title: 'Recipe 4', description: 'Delicious recipe 4', imageUrl: 'path/to/image4.jpg' },
{ id: 5, title: 'Recipe 5', description: 'Delicious recipe 5', imageUrl: 'path/to/image5.jpg' },
{ id: 6, title: 'Recipe 6', description: 'Delicious recipe 6', imageUrl: 'path/to/image6.jpg' },
{ id: 7, title: 'Recipe 7', description: 'Delicious recipe 7', imageUrl: 'path/to/image7.jpg' },
{ id: 8, title: 'Recipe 8', description: 'Delicious recipe 8', imageUrl: 'path/to/image8.jpg' },
// Add more dummy recipes as needed
];

const FeaturedRecipes = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
      const interval = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(dummyData.length / 2));
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
  }, []);

  return (
      <div className="bg-gradient-to-r from-green-50 to-green-100 min-h-screen p-8 font-urbanist">
          <h1 className="text-4xl font-bold text-center mb-12 text-green-800 tracking-wide">Featured Recipes</h1>

          <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-xl">
              <div 
                  className="flex transition-transform duration-500 ease-in-out" 
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                  {Array.from({ length: Math.ceil(dummyData.length / 2) }, (_, i) => i * 2).map((startIndex) => (
                      <div key={startIndex} className="w-full flex-shrink-0 flex">
                          {dummyData.slice(startIndex, startIndex + 2).map((recipe) => (
                              <div key={recipe.id} className="w-1/2 px-2">
                                  <Link to={`/recipes/${recipe.id}`} className="block w-full h-full">
                                      <FeaturedRecipesCard
                                          title={recipe.title}
                                          image={recipe.imageUrl}
                                          description={recipe.description}
                                      />
                                  </Link>
                              </div>
                          ))}
                      </div>
                  ))}
              </div>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                  {Array.from({ length: Math.ceil(dummyData.length / 2) }, (_, index) => (
                      <button
                          key={index}
                          className={`w-3 h-3 rounded-full ${
                              index === currentIndex ? 'bg-green-600' : 'bg-green-300'
                          }`}
                          onClick={() => setCurrentIndex(index)}
                      />
                  ))}
              </div>
          </div>
      </div>
  );
};

export default FeaturedRecipes;