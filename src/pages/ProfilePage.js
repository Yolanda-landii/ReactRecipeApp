import React, { useState, useEffect } from 'react';
import { fetchUsers, updateUser } from '../services/api'; 
import './Profile.css'; 

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          const result = await fetchUsers();
          const currentUser = result.data.find(u => u.id === user.id);
          if (currentUser) {
            setProfile(currentUser);
            setName(currentUser.name);
            setSurname(currentUser.surname);
            setEmail(currentUser.email);
            setPhone(currentUser.phone);
            setProfilePicture(currentUser.profilePicture);
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error.response ? error.response.data : error.message);
        setError('Error fetching profile');
      }
    };

    fetchProfile();
  }, []);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  // Clean up the object URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (profilePicture) {
        URL.revokeObjectURL(profilePicture);
      }
    };
  }, [profilePicture]);

  const handleSaveProfile = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('surname', surname);
      formData.append('email', email);
      formData.append('phone', phone);
      if (profilePicture) {
        formData.append('profilePicture', profilePicture);
      }

      await updateUser(profile.id, formData);

      // Optionally update localStorage
      const updatedUser = { ...profile, name, surname, email, phone, profilePicture };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error.response ? error.response.data : error.message);
      setError('Error updating profile');
    }
  };

  return (
    <div className="profile-page">
      <div className="main-content">
        <header className="header">
          <div className="profile-actions">
            <div className="user-info">
              <img src={profilePicture || '/default-profile.png'} alt="User" className="profile-pic" />
              <span>{profile?.name} {profile?.surname}</span>
            </div>
            <input type="file" onChange={handleProfilePictureChange} />
          </div>
        </header>

        <main className="profile-main">
          <section className="profile-info">
            <h2>General Information</h2>
            {error && <div className="error-message">{error}</div>}
            <form className="profile-form" onSubmit={handleSaveProfile}>
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your first name"
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  placeholder="Enter your last name"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+12-345 678 910"
                />
              </div>
              <button type="submit" className="save-button">Save All</button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
