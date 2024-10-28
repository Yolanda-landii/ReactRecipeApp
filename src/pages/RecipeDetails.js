import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const result = await api.get(`/recipes/${id}`);
        setRecipe(result.data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="recipe-detail-container">
      {recipe.image && <img src={recipe.image} alt={recipe.title} className="recipe-detail-image" />}
      <div className="recipe-detail-info">
        <h2>{recipe.title}</h2>
        <h4>Category: {recipe.category}</h4>
        <p>Prep Time: {recipe.prepTime} mins</p>
        <p>Cook Time: {recipe.cookTime} mins</p>
        <p>Servings: {recipe.servings}</p>
        <h4>Ingredients:</h4>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h4>Instructions:</h4>
        <p>{recipe.instructions}</p>
      </div>
    </div>
  );
};

export default RecipeDetail;
