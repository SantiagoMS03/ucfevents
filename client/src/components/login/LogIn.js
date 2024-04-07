import React, { Fragment, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserFinder from '../../apis/UserFinder';
import "./LogIn.css"; 

import GetCookie from '../Cookie';
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate()

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await UserFinder.post("/login", {
        email,
        password
      })
      const id = response.data.data.payload.id;
      document.cookie = `user_id=${id}; path=/`;
      const access = response.data.data.payload.access;
      document.cookie = `access=${access}; path=/`;
      navigate(`/welcome`)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Fragment>
      <div className="container">
        <h1 className="title">LogIn</h1> {/* Title added here */}
        <div className="back-arrow">
          <Link to="/">Back</Link>
        </div>
        <div className="box">
          <form className="form-container">
            <label className="label" htmlFor='email'>Email</label>
            <input
              id='email'
              className="input"
              value={email}
              type='text'
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="label" htmlFor='password'>Password</label>
            <input
              id='password'
              className="input"
              value={password}
              type='password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="button" onClick={handleClick}>Log In!</button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default LogIn;
