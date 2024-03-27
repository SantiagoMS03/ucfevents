import React, { Fragment } from 'react'
import { useNavigate } from "react-router-dom";
import Register from "../../components/login/Register"

function RegisterPage() {
  let navigate = useNavigate()

  const handleSuperAdminSelect = () => { 
    navigate(`/register/superadmin`)
  }
  const handleAdminSelect = () => { 
    navigate(`/register/admin`)
  }
  const handleUserSelect = () => { 
    navigate(`/register/user`)
  }

  return (
    <div>
      <h1 style={{display: 'flex', justifyContent: 'center'}}>Create an Account</h1>
      <h2 style={{display: 'flex', justifyContent: 'center'}}>Select an option</h2>
      <div style={{display: 'flex', justifyContent: 'center'}}> 
        <button type="button" onClick={handleSuperAdminSelect}>Register a university</button>
        <button type="button" onClick={handleAdminSelect}>Register a RSO</button>
        <button type="button" onClick={handleUserSelect}>Register as a student</button>
      </div>
    </div>
  )
}

export default RegisterPage;