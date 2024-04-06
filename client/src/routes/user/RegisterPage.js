import React, { Fragment } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Register from '../../components/login/Register';
import './RegisterPage.css';

function RegisterPage() {
  let navigate = useNavigate();

  const handleSuperAdminSelect = () => {
    navigate(`/newuniversity`);
  };

  const handleAdminSelect = () => {
    navigate(`/register/admin`);
  };

  const handleUserSelect = () => {
    navigate(`/register/user`);
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="back-arrow">
          <Link to="/">Back</Link>
        </div>
        <h1 className="register-title">Create an Account</h1>
        <h2 className="register-subtitle">Select an option</h2>
        <div className="register-button-container">
          <button className="register-button" type="button" onClick={handleSuperAdminSelect}>
            Register a university
          </button>
          <button className="register-button" type="button" onClick={handleAdminSelect}>
            Register a RSO
          </button>
          <button className="register-button" type="button" onClick={handleUserSelect}>
            Register as a student
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
