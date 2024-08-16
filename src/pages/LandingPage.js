// src/pages/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Profile.css'; // Import the updated CSS file for styling

const LandingPage = () => {
 

  return (
    <div className="landing-page-container">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to Recipe Finder</h1>
        <p className="hero-subtitle">Discover, share, and enjoy amazing recipes!</p>
        <div className="phone-mockup">
         
        </div>
      </div>

      <div className="auth-container">
        <Link to="/register" className="auth-button">Sign Up</Link>
        <Link to="/login" className="auth-button">Login</Link>
      </div>
    </div>
  );
};

export default LandingPage;
