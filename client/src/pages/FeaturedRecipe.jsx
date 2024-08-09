import React from 'react';
import FeaturedRecipesCard from '../components/FeaturedRecipesCard';

const dummyData = [
  { id: 1, title: 'Recipe 1', description: 'Delicious recipe 1', imageUrl: 'path/to/image1.jpg' },
  { id: 2, title: 'Recipe 2', description: 'Delicious recipe 2', imageUrl: 'path/to/image2.jpg' },
  // Add more dummy recipes as needed
];

const FeaturedRecipes = () => {
    return (
      <div className="bg-green-50 min-h-screen p-8 font-urbanist">
        <h1 className="text-3xl font-semibold text-center mb-8">Featured Recipes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {dummyData.map((recipe) => (
            <FeaturedRecipesCard
              key={recipe.id}
              title={recipe.title}
              image={recipe.imageUrl}
              description={recipe.description}
            />
          ))}
        </div>
      </div>
    );
};

export default FeaturedRecipes;
