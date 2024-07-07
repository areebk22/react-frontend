import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="navbar-content">
          <Link to="/" className="navbar-link">Hello | World</Link>
        </div>
      </div>
      <div className="yellow-strip"></div>
    </div>
  );
};

export default Navbar;