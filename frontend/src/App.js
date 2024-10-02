import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import CaseManagement from './components/CaseManagement';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage'; // Ensure this component is correctly implemented

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
      
        <Route path="/" element={<HomePage />} /> {/* Your Home Page */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/cases" element={<CaseManagement />} />
      </Routes>
    </Router>
  );
};

export default App;
