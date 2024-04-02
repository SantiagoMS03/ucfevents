import React from "react";
import logo from "../images/group.png";
import angle from "../images/angle-small-down.png"
import "./Header.css";
import { useNavigate } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="div">
        <img loading="lazy" srcSet={logo} className="img" />
        <div className="div-2">
          <button className="div-3-button">Home page</button>
          <button className="div-4-button">Map</button>
          <div className="div-5">
            <button className="div-6-button">Contact Us</button>
            <div className="div-7">
              <div className="div-8">
                <div className="dropdown">
                  <button className="div-9-button">Events</button>
                  <div className="dropdown-content">
                    <a href="#">Today's Events</a>
                    <a href="#">Weekly Events</a>
                    <a href="#">Upcoming Events</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;


