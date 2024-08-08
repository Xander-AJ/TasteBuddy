import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import UserRecipes from './pages/UserRecipes';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/recipes">Recipes</Link>
        <Link to="/profile">Profile</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/recipes" />} />
        <Route path="/recipes" element={<UserRecipes />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
