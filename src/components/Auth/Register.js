import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';

const Registration = () => {
  const [formData, setFormData] = useState({ name: '', surname: '', email: '', username: '', password: '' });
  const [error, setError] = useState(''); 

  const handleRegister = async (e) => {
    e.preventDefault();
  
    try {
      const { data: users } = await axios.get('http://localhost:3000/users');
      const existingUser = users.find(user => user.email === formData.email); 
  
      if (existingUser) {
        alert('Email already in use');
        return;
      }
  
      const user = {
        name: formData.name, 
        surname: formData.surname, 
        email: formData.email, 
        username: formData.username, 
        password: formData.password, 
      };
  
      await axios.post('http://localhost:3000/users', user); 
      alert('User registered successfully');
    } catch (error) {
      console.error('Registration error:', error);
      setError('An error occurred during registration'); 
      if (error.response) {
        alert(error.response.data.message); 
      } 
    }
  
  };

  return (
    <div className="auth-container">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Surname"
          value={formData.surname}
          onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <button type="submit">Register</button>
      </form>
      {error && <p className="error">{error}</p>} 
      <p>Already have an account? <a href="/login">Login here</a></p>
    </div>
  );
};

export default Registration;
