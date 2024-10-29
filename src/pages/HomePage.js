import React, { useState, useEffect } from 'react';
import RecipeList from '../components/Recipes/RecipeList';
import RecipeForm from '../components/Recipes/RecipeForm'; 
import Navbar from '../components/Shared/Navigation';
import Footer from '../components/Shared/Footer';
import { api } from '../services/api';
import './Profile.css';

const HomePage = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [categories] = useState([
    { name: 'Breakfast', image: '/images/pexels-tijana-drndarski-449691-2635307.jpg' },
    { name: 'Lunch', image: '/images/pexels-pixabay-361184.jpg' },
    { name: 'Dinner', image: '/images/pexels-chanwalrus-958545.jpg' }
  ]);
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const result = await api.get('/recipes');
        console.log('Fetched recipes:', result.data); 
        setRecipes(result.data.recipes || []); 
        setFilteredRecipes(result.data.recipes || []);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };
    fetchRecipes();
  }, []);
  
  useEffect(() => {
    const updatedFilteredRecipes = recipes.filter(recipe => {
      const recipeName = recipe.name ? recipe.name.toLowerCase() : ''; // Ensure recipe.name is defined
      const recipeCategory = recipe.category ? recipe.category.toLowerCase() : ''; // Ensure recipe.category is defined
  
      const matchesCategory = selectedCategory
        ? recipeCategory === selectedCategory.toLowerCase()
        : true;
      const matchesName = recipeName.includes(searchTerm.toLowerCase());
  
      return matchesCategory && matchesName;
    });
  
    setFilteredRecipes(updatedFilteredRecipes);
    setNoResults(updatedFilteredRecipes.length === 0);
  }, [searchTerm, selectedCategory, recipes]);
  

  const handleAddNewRecipe = () => {
    setSelectedRecipe(null); 
    setFormVisible(true);
  };

  const handleSaveRecipe = async () => {
    setFormVisible(false);

    const result = await api.get('/recipes');
    console.log('Updated recipes:', result.data);
    setRecipes(result.data.recipes || []);
    setFilteredRecipes(result.data.recipes || []); 
};

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.name);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="page-container">
      <Navbar/>
      <h1>Recipe Management</h1>

      <div className="search-add-container">
        <input
          type="text"
          placeholder="Search by recipe name"
          className="search-input"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select className="category-select" onChange={handleCategoryChange} value={selectedCategory}>
          <option value="">All Categories</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>
        <button className="search-button">Search</button>
      </div>
      <button className="add-recipe-btn" onClick={handleAddNewRecipe}>Add New Recipe</button>

      {!isFormVisible && (
        <div className="category-container">
          {categories.map(category => (
            <div
              key={category.name}
              onClick={() => handleCategoryClick(category)}
              className={`category-card ${selectedCategory === category.name ? 'active' : ''}`}
            >
              <img src={category.image} alt={category.name} />
              <span>{category.name}</span>
            </div>
          ))}
        </div>
      )}

      {isFormVisible ? (
        <RecipeForm 
          recipe={selectedRecipe}
          onSave={handleSaveRecipe} 
        />
      ) : (
        <div>
          {noResults ? (
            <p>No items found</p>
          ) : (
            <RecipeList
              recipes={filteredRecipes}
              onEdit={(recipe) => {
                setSelectedRecipe(recipe);
                setFormVisible(true);
              }}
            />
          )}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default HomePage;