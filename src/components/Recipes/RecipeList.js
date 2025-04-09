import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes, onEdit }) => {
  if (recipes.length === 0) {
    return null; // This is handled by the parent component now
  }

  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <RecipeCard
          key={recipe._id} 
          recipe={recipe}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default RecipeList;
