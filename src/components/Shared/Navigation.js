// src/components/Shared/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Shared.css'; // Import the CSS file for styling

const Navigation = () => {
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-link">Recipe Hub</Link>
        </div>
        <div className="navbar-links">
          {token ? (
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
