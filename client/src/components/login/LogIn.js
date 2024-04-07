import React, { Fragment, useState }from 'react'
import UserFinder from '../../apis/UserFinder';
import GetCookie from '../Cookie';
import { useNavigate } from "react-router-dom";

const LogIn = () => {

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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Fragment>
      <form action=''>
        <label htmlFor='username'>Email</label>
        <input
          id='email'
          value={email}
          type='text'
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor='password'>Password</label>
        <input
          id='password'
          value={password}
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleClick}>Log In!</button>
      </form>
    </Fragment>
  )
}

export default LogIn;