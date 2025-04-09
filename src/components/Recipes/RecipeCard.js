import React from 'react';
import { api } from '../../services/api';
import './RecipeForm.css'; 

const RecipeCard = ({ recipe, onEdit }) => {
  const handleDelete = async () => {
    try {
      await api.delete(`/recipes/${recipe._id}`); 
      window.location.reload();
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [recipe.ingredients];

  return (
    <div className="recipe-card">
      <div className="recipe-header">
        <h3 className="recipe-title">{recipe.name}</h3>
        <span className="recipe-category">{recipe.category}</span>
      </div>
      
      <div className="recipe-details">
        <div className="recipe-time-details">
          <div className="time-detail">
            <i className="time-icon">⏱️</i>
            <div>
              <span className="detail-label">Prep Time</span>
              <span className="detail-value">{recipe.preparationTime ? `${recipe.preparationTime} min` : 'N/A'}</span>
            </div>
          </div>
          <div className="time-detail">
            <i className="time-icon">🔥</i>
            <div>
              <span className="detail-label">Cook Time</span>
              <span className="detail-value">{recipe.cookingTime ? `${recipe.cookingTime} min` : 'N/A'}</span>
            </div>
          </div>
          <div className="time-detail">
            <i className="time-icon">👥</i>
            <div>
              <span className="detail-label">Servings</span>
              <span className="detail-value">{recipe.servings || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="recipe-content">
        <div className="recipe-section">
          <h4 className="section-title">Ingredients</h4>
          <ul className="recipe-ingredients">
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        
        <div className="recipe-section">
          <h4 className="section-title">Instructions</h4>
          <p className="recipe-instructions">{recipe.instructions}</p>
        </div>
      </div>
      
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
