
import React from 'react';
import { api } from '../../services/api';
import './RecipeForm.css'; 

const RecipeCard = ({ recipe, onEdit }) => {
  const handleDelete = async () => {
    await api.delete(`/recipes/${recipe.id}`);
    window.location.reload();
  };

  const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [recipe.ingredients];

  return (
    <div className="recipe-card">
      <h3 className="recipe-title">{recipe.name}</h3>
      
      <h4>Ingredients:</h4>
      <ul className="recipe-ingredients">
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      
      <p><strong>Instructions:</strong> {recipe.instructions}</p>
      <p><strong>Category:</strong> {recipe.category}</p>
      <p><strong>Preparation Time:</strong> {recipe.prepTime}</p>
      <p><strong>Cooking Time:</strong> {recipe.cookTime}</p>
      <p><strong>Servings:</strong> {recipe.servings}</p>
      
      <div className="recipe-actions">
        <button className="edit-button" onClick={() => onEdit(recipe)}>
          Edit Recipe
        </button>
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
