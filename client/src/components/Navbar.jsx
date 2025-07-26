import React from 'react';
import { Link } from 'react-router-dom';
import './Navabar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-title">
        <span className="icon">💼</span> CareerPath AI
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/recommend" className="nav-link">Get Recommendations</Link>
        <Link to="/post-job" className="nav-link">Post Job</Link>
        <Link to="/job-list" className="nav-link">Jobs</Link>
      </div>
    </nav>
  );
};

export default Navbar;
