import React from 'react'
import AddEvent from "../components/events/AddEvent"

function HomePage() {
  return (
    <>
      <div className="page-container">
        <header className="header-container">
          <h1 className="site-title">College Event Website</h1>
          <p className="site-description">
            Register your University, add clubs, and track events.
          </p>
        </header>
        <main className="main-container">
        <div className="divider"></div>
          <section className="login-section">
            <Form />
          </section>
        </main>
      </div>
      <style jsx>
        {`
          .page-container {
            display: flex;
            flex-direction: row;
            align-items: space-evenly;
            margin-top: 100px;
            width: 100%;
          }
          .header-container {
            text-align: center;
            margin-top: -20px;
            margin-left: 100px;
            margin-right: -80px;
            flex-grow: 1;
          }
          .site-title {
            text-align: start;
            font: 86px Inter, sans-serif;
            font-weight: lighter;
          }
          .site-description {
            text-align: start;
            margin-top: -30px;
            font: 28px Inter, sans-serif;
            font-weight: lighter;
          }
          .divider {
            width: 1px;
            margin-top: -50px;
            height: 120%;
            background-color: #000;
            margin: 30 40px;
          }
          .main-container {
            width: 100%;
            display: flex;
            justify-content: space-evenly;
            flex-grow: 1;
          }
          .login-section {
            width: 80%;
            max-width: 500px;
            flex-grow: 3;
            display: flex;
            margin-right: 30px;
            flex-direction: row;
            align-items: center;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            background: #f9f9f9;
          }
        `}
      </style>
    </>
  );
}

function Form() {
  return (
    <form className="login-form" aria-label="Login form">
      <h2 className="form-title">Login</h2>
      <label htmlFor="userId" className="visually-hidden">User ID</label>
      <input type="text" id="userId" className="form-input" placeholder="User ID" aria-label="User ID" />
      <label htmlFor="password" className="visually-hidden">Password</label>
      <input type="password" id="password" className="form-input" placeholder="Password" aria-label="Password" />
      <button type="submit" className="submit-btn">Submit</button>
      <button type="button" className="account-btn">Create an Account</button>
      <style jsx>{`
        .login-form {
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 385px;
          box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
          background-color: #edeae5;
          align-items: center;
          padding: 50px 60px;
        }
        .form-title {
          font-size: 40px;
          font-family: Helvetica, sans-serif;
          font-weight: lighter;
        }
        .form-input {
          width: 100%;
          padding: 10px;
          margin: 20px 0;
          border-radius: 4px;
          border: 1px solid #505050;
          box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        }
        .submit-btn {
          width: 100%;
          padding: 10px;
          margin-top: 20px;
          border-radius: 4px;
          border: 1px solid #505050;
          box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
          cursor: pointer;
        }
        .account-btn {
          width: 100%;
          padding: 10px;
          margin-top: 20px;
          border-radius: 4px;
          border: 0px;
          font-size: 19px;
          text-decoration: underline;
          background-color: #edeae5;
          cursor: pointer;
        }
        .visually-hidden {
          position: absolute;
          clip: rect(0 0 0 0);
          clip-path: inset(50%);
          width: 1px;
          height: 1px;
          margin: -1px;
          overflow: hidden;
          white-space: nowrap;
        }
      `}</style>
    </form>
  );
}

export default HomePage