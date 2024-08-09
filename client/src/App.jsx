import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import UserRecipes from './pages/UserRecipes';
import UserProfile from './pages/UserProfile';
import FeaturedRecipes from "./pages/FeaturedRecipe";
  // Add this line

function App() {
  return (
    <Router>
      <nav>
        <Link to="/profile">Profile</Link>
        <Link to="/featured-recipes">Featured-Recipes</Link>
        <Link to="/recipes">My-Recipes</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/profile" />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/recipes" element={<UserRecipes />} />
        <Route path="/featured-recipes" element={<FeaturedRecipes />} /> {/* This is where FeaturedRecipes is used */}
      </Routes>
    </Router>
  );
}

export default App;
