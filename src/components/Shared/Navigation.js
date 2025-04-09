// src/components/Shared/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Shared.css'; // Import the CSS file for styling

const Navigation = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('authToken');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-link">Recipe Hub</Link>
        </div>
        <div className="navbar-links">
          {isAuthenticated ? (
            <>
              <Link className="navbar-link" to="/home">Home</Link>
              <Link className="navbar-link" to="/profile">Profile</Link>
              <button className="navbar-button" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link className="navbar-link" to="/login">Login</Link>
              <Link className="navbar-link" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
