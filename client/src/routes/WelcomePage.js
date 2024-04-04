import React from 'react';
import { useNavigate } from "react-router-dom";
import Header from'../components/Header.js';

function WelcomePage() {
    return (
      <div>
        <Header />
        <div>
          {/* Your welcome page content here */}
          <h1>Welcome to our website!</h1>
          <p>This is the welcome page content.</p>
        </div>
      </div>
    );
  }
  

export default WelcomePage
