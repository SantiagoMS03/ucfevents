import React from "react";
import logo from "../images/group.png";
import angle from "../images/angle-small-down.png";
import "./Header.css";
import { useNavigate, Link } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logged out!");
    // Example: navigate to the login page after logout
    navigate("/login");
  };

  const handleHomePage = () => {
    console.log("Back to home page")
    navigate("/welcome");
  }

  const handleRSOPage = () =>{
    console.log("Loading RSO page")
    navigate("/rsos");
  }

  return (
    <>
      <div className="div">
        <img loading="lazy" srcSet={logo} className="img" />
        <div className="div-2">
          <button className="div-3-button" onClick ={handleHomePage}>Home page</button>
          <div className="div-5">
            <button className="div-6-button"onClick ={handleRSOPage}> RSO's</button>
            <div className="div-7">
              <div className="div-8">
                <div className="dropdown">
                  <button className="div-9-button">Events</button>
                  <div className="dropdown-content">
                    <a href="#">Attending</a>
                    <Link to="/rsoevents">RSO events</Link>
                    <Link to="/publicevents">Public Events</Link>
                    <Link to="/privateevents">Private Events</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
}

export default Header;
