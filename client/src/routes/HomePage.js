import React from 'react';
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import logo from "../images/group.png"; 

function HomePage() {
  let navigate = useNavigate()

  const handleLoginSelect = () => { 
    navigate(`/login`)
  }
  const handleRegisterSelect = () => { 
    navigate(`/register`)
  }

  return (
    React.createElement('div', { className: 'homepage-container' }, // Wrap only the homepage content in a container
      React.createElement('div', { className: 'homepage' },
        React.createElement('h2', { className: 'homepage-title' }, 'College event website'), // Add title
        React.createElement('p', { className: 'homepage-description' }, 'Register your University, add clubs, and track events.'), // Add description
        React.createElement('div', { className: 'box' }, // Wrap everything in a box
          React.createElement('img', { src: logo, alt: 'Your Logo', className: 'logo' }),
          React.createElement('div', { className: 'button-container' },
            React.createElement('button', { type: 'button', className: 'login-button', onClick: handleLoginSelect }, 'Login'),
            React.createElement('button', { type: 'button', className: 'register-button', onClick: handleRegisterSelect }, 'Register')
          )
        )
      )
    )
  );
}

export default HomePage;
