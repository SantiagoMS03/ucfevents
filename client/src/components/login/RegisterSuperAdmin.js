import React, { Fragment, useState, useEffect, useContext }from 'react';
import UserFinder from '../../apis/UserFinder'
import UniversityFinder from '../../apis/UniversityFinder';
import { UniversityContext } from '../../context/UniversityContext';
import { useNavigate, Link } from "react-router-dom";
import "./RegisterSuperAdmin.css";

function RegisterSuperAdmin(props) {
  const [university_id, setUniversityId] = useState("");
  const [access] = useState("true");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { unis, setUnis } = useContext(UniversityContext);
  let navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UniversityFinder.get("/");
        setUnis(response.data.data.universities);
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [])

  const handleChange = (e) => {
    setUniversityId(e.target.value);
    console.log(e.target.value)
  }

    const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await UserFinder.post("/register", {
        university_id,
        access,
        email,
        password
    })
    navigate('/login');
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div className="container">
      <Fragment>
        <form className="form-container" action=''>
        <div className="back-arrow">
      <Link to="/register">Back</Link>
      </div>
          <h2 className="title">Register Super Admin</h2>
          <select className="input" value={university_id} onChange={handleChange}> 
            <option value=""> Select a University </option>
            {unis.map((uni) => (
              <option value={uni.university_id} key={uni.university_id}>{uni.name}</option>))}
          </select>
          <label className="label" htmlFor='email'>Email</label>
          <input
            className="input"
            id='email'
            value={email}
            type='text'
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="label" htmlFor='password'>Password</label>
          <input
            className="input"
            id='password'
            value={password}
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button" onClick={handleClick}>Sign Up!</button>
        </form>
      </Fragment>
    </div>
  );
}

export default RegisterSuperAdmin;
