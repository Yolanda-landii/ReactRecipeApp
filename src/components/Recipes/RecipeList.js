// src/components/Recipes/RecipeList.js
import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes, onEdit }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userRecipes = recipes.filter(recipe => recipe.userId === user?.id);

  return (
    <div className="recipe-list">
      {userRecipes.length > 0 ? (
        userRecipes.map(recipe => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onEdit={onEdit}
          />
        ))
      ) : (
        <p>No recipes available in this category.</p>
      )}
    </div>
  );
};

export default RecipeList;
