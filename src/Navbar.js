import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import './Register.js';
import './Trivia.js';

const Navbar = () => {
  return (
    <nav className="Navbar">
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="active">Home</NavLink>
        </li>
        <li>
          <NavLink to="/savedLocations" activeClassName="active">Saved Locations</NavLink>
        </li>
        <li>
          <NavLink to="/write-review" activeClassName="active">MyReviews</NavLink>
        </li>
        <li>
          <NavLink to="/trivia" activeClassName="active">Trivia Game</NavLink>
        </li>
        <li>
          <NavLink to="/register" activeClassName="active">Sign Up/Log In</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;


