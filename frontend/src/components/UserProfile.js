import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const token = localStorage.getItem('token'); // Assuming the token is stored here

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (token) {
      fetchProfile();
    }
  }, [token]);

  return (
    <div>
      {profile ? (
        <div>
          <h1>{profile.name}</h1>
          <p>Email: {profile.email}</p>
          <p>Role: {profile.role}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;
