import React from 'react';
import { useNavigate } from "react-router-dom";

function HomePage() {
  let navigate = useNavigate()

  const handleLoginSelect = () => { 
    navigate(`/login`)
  }
  const handleRegisterSelect = () => { 
    navigate(`/register`)
  }

  return (
    <div>
      HomePage
      <button type="button" onClick={handleLoginSelect}>Login</button>
      <button type="button" onClick={handleRegisterSelect}>Register</button>
    </div>
  )
}

export default HomePage
