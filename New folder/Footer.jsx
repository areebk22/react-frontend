import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <Link to="/about-us" className="footer-link">About Us</Link>
      </div>
    </div>
  );
};

export default Footer;