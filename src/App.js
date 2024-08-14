// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import Login from './components/Auth/Login';
import Registration from './components/Auth/Register';
import ProtectedRoute from './components/Shared/ProtectedRouter';
import RecipeDetail from './pages/RecipeDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/home" element={<ProtectedRoute element={<HomePage />} />} />
        <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
        <Route path="/recipe/:id" element={<ProtectedRoute element={<RecipeDetail />} />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
