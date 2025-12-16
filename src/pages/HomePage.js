import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      
      {/* 1. Navbar Section */}
      <nav className="navbar">
        <div className="logo">EventHive</div>
        <div className="nav-links">
          <Link to="/login" className="nav-item">Login</Link>
          <Link to="/signup" className="nav-item btn-signup">Sign Up</Link>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Host Events, <br />
            <span className="highlight">Create Memories.</span>
          </h1>
          <p className="hero-subtitle">
            The simplest way to create events, manage tickets, and track registrations. 
            No complex setup required.
          </p>
          
          <div className="cta-group">
            <Link to="/signup" className="btn-primary">
              Get Started for Free
            </Link>
            <Link to="/login" className="btn-secondary">
              Login
            </Link>
          </div>
        </div>

        {/*  Decorative visual element */}
        <div className="hero-visual">
          <div className="floating-card card-1">
            <span>🎉 Music Fest</span>
            <small>Sold Out</small>
          </div>
          <div className="floating-card card-2">
            <span>🚀 Tech Talk</span>
            <small>500+ Attendees</small>
          </div>
        </div>
      </header>
    </div>
  );
};

export default HomePage;