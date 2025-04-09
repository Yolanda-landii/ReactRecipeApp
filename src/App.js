// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import Login from './components/Auth/Login';
import Registration from './components/Auth/Register';
import Navigation from './components/Shared/Navigation';
import RecipeDetail from './pages/RecipeDetails';

// A simple utility to check if user is authenticated
const useAuth = () => {
  // Replace with your authentication logic
  return !!localStorage.getItem('authToken');
};

const App = () => {
  const isAuthenticated = useAuth();

  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/home" />} />
            <Route path="/register" element={!isAuthenticated ? <Registration /> : <Navigate to="/home" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />
            <Route path="/recipe/:id" element={isAuthenticated ? <RecipeDetail /> : <Navigate to="/login" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
