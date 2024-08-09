import React from 'react';
import FeaturedRecipesCard from '../components/FeaturedRecipesCard';

const FeaturedRecipes = () => {
    return (
      <div className="featured-recipes">
        <h1>Featured Recipes</h1>
        <div className="recipes-list">
          {dummyData.map((recipe) => (
            <FeaturedRecipesCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    );
  };
  
  export default FeaturedRecipes;