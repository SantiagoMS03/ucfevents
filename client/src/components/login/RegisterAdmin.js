import React, { Fragment, useState, useEffect, useContext }from 'react';
import SearchRSO from '../rsos/SearchRSO';
import UserFinder from '../../apis/UserFinder'
import UniversityFinder from '../../apis/UniversityFinder';
import { useNavigate, Link } from 'react-router-dom';
import { UniversityContext } from '../../context/UniversityContext';
import AddEvent from '../events/AddEvent';
import "./RegisterAdmin.css";
import AddRSO from '../rsos/AddRSO';

function RegisterAdmin(props) {
  const [university_id, setUniversityId] = useState("");
  const [access] = useState("true");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [unis, setUnis] = useState([]);
  let navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UniversityFinder.get("/");
        setUnis(response.data.data.universities);
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
    <div className="container5">
    <div className="form-container5">
      <Fragment>
        <form className="form" action=''>
        <h2 className="title">Register an RSO</h2> 
          <select className="input" value={university_id} onChange={handleChange}>
            <option value=""> Select a University </option>
            {unis &&
              unis.map((uni) => (
              <option value={uni.university_id} key={uni.university_id}>{uni.name}</option>))}
          </select>
          <label htmlFor='email' className="label">Email</label>
          <input
            id='email'
            value={email}
            type='text'
            className="input"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor='password' className="label">Password</label>
          <input
            id='password'
            value={password}
            type='password'
            className="input"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleClick} className="button">Sign Up!</button>
        </form>
      </Fragment>
    </div>
    </div>
  );
}

export default RegisterAdmin;
