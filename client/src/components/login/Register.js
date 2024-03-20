import React, { Fragment, useState }from 'react'

const Register = () => {
  const handleClick = async (e) => {
    e.preventDefault();
    try {
        console.log('hi!');
    } catch (err) {
      console.error(err);
    }
  }
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Fragment>
      <form action=''>
        <label htmlFor='username'>Username</label>
        <input
          id='username'
          value={username}
          type='text'
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor='password'>Password</label>
        <input
          id='password'
          value={password}
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleClick}>Sign Up!</button>
      </form>
    </Fragment>
  )
}

export default Register;