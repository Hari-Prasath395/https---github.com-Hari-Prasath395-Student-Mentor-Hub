import React from 'react';
import './Home.css'
import {Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="home-caption">
        <h1>Welcome to Student Mentor Hub</h1>
        <p>Find the perfect mentor or student for your educational journey</p>
      </div>
      <div className="home-buttons">
        <Link to='/mentor' className="home-button">Add Mentor</Link>
        <Link to='/student' className="home-button">Add Student</Link>
        <Link to='/assign-student-to-mentor' className="home-button">Assign S-M</Link>
        <Link to='/assignMentorToStudent' className="home-button">Assign M-S</Link>
        <Link to='/students-for-mentor' className="home-button">StudentForMentor</Link>
        <Link to='/previous-mentor-for-student' className="home-button">PrevMentor/Students</Link>
      </div>
    </div>
  );
};

export default HomePage;
