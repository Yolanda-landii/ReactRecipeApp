import axios from 'axios';

// Update this URL to match your backend API endpoint
const API_URL = 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API methods
export const auth = {
  login: async (credentials) => {
    try {
      console.log('Sending login request to:', `${API_URL}/auth/login`);
      const response = await api.post('/auth/login', credentials);
      console.log('Login response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Login API error:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
      }
      throw error;
    }
  },
  register: async (userData) => {
    try {
      console.log('Sending register request to:', `${API_URL}/auth/register`);
      const response = await api.post('/auth/register', userData);
      console.log('Register response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Register API error:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
      }
      throw error;
    }
  },
  logout: () => {
    localStorage.removeItem('token');
  }
};

export const fetchRecipes = () => api.get('/recipes');
export const addRecipe = (recipe) => api.post('/recipes', recipe);
export const updateRecipe = (id, recipe) => api.patch(`/recipes/${id}`, recipe);
export const deleteRecipe = (id) => api.delete(`/recipes/${id}`);

export const fetchUsers = () => api.get('/users');

export const addUser = (user) => api.post('/users', user);
export const updateUser = (id, user) => api.patch(`/users/${id}`, user);
