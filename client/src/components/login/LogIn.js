import React, { Fragment, useState }from 'react'
import UserFinder from '../../apis/UserFinder';

const LogIn = () => {

    const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await UserFinder.post("/login", {
        email,
        password
    })
    console.log("success")
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