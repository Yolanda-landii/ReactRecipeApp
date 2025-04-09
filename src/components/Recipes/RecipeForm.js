import React, { useState } from 'react';
import { api } from '../../services/api';
import './RecipeForm.css';

const RecipeForm = ({ recipe, onSave }) => {
  const [name, setName] = useState(recipe?.name || '');
  const [ingredients, setIngredients] = useState(Array.isArray(recipe?.ingredients) ? recipe.ingredients.join('\n') : recipe?.ingredients || '');
  const [instructions, setInstructions] = useState(recipe?.instructions || '');
  const [category, setCategory] = useState(recipe?.category || '');
  const [preparationTime, setPreparationTime] = useState(recipe?.preparationTime || '');
  const [cookingTime, setCookingTime] = useState(recipe?.cookingTime || '');
  const [servings, setServings] = useState(recipe?.servings || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = ['Breakfast', 'Lunch', 'Dinner'];
  const user = JSON.parse(localStorage.getItem('user'));

  const validateInputs = () => {
    if (name.length < 3) {
      setError("Recipe name must be at least 3 characters.");
      return false;
    }
    if (!ingredients.trim()) {
      setError("Please enter at least one ingredient.");
      return false;
    }
    if (instructions.length < 10) {
      setError("Instructions must be at least 10 characters.");
      return false;
    }
    if (!category) {
      setError("Please select a category.");
      return false;
    }
    if (isNaN(preparationTime) || preparationTime <= 0) {
      setError("Preparation time must be a positive number.");
      return false;
    }
    if (isNaN(cookingTime) || cookingTime <= 0) {
      setError("Cooking time must be a positive number.");
      return false;
    }
    if (isNaN(servings) || servings <= 0) {
      setError("Servings must be a positive number.");
      return false;
    }
    setError('');
    return true;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    setLoading(true);
    setError('');

    const newRecipe = {
      name,
      ingredients: ingredients.split('\n').filter(ingredient => ingredient.trim()),
      instructions,
      category,
      preparationTime: parseInt(preparationTime, 10),
      cookingTime: parseInt(cookingTime, 10),
      servings: parseInt(servings, 10),
      userId: user.id
    };

    try {
      if (recipe) {
        await api.patch(`/recipes/${recipe._id}`, newRecipe);
      } else {
        await api.post('/recipes', newRecipe);
      }
      onSave();
    } catch (err) {
      console.error('Error saving recipe:', err);
      setError('An error occurred while saving the recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recipe-form-container">
      <h2>{recipe ? 'Edit Recipe' : 'New Recipe'}</h2>
      <form onSubmit={handleSave}>
        <input
          type="text"
          placeholder="Recipe Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Ingredients (one per line)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
        />
        <textarea
          placeholder="Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select a category</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Preparation Time (minutes)"
          value={preparationTime}
          onChange={(e) => setPreparationTime(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Cooking Time (minutes)"
          value={cookingTime}
          onChange={(e) => setCookingTime(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Servings"
          value={servings}
          onChange={(e) => setServings(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Recipe'}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default RecipeForm; 