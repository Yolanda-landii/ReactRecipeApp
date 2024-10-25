import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
export const fetchRecipes = () => api.get('/recipes');
export const addRecipe = (recipe) => api.post('/recipes', recipe);
export const updateRecipe = (id, recipe) => api.patch(`/recipes/${id}`, recipe);
export const deleteRecipe = (id) => api.delete(`/recipes/${id}`);

export const fetchUsers = () => api.get('/users');

export const addUser = (user) => api.post('/users', user);
export const updateUser = (id, user) => api.patch(`/users/${id}`, user);
