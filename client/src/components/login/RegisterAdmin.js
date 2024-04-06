import React, { Fragment, useState, useEffect, useContext }from 'react';
import SearchRSO from '../rsos/SearchRSO';
import UserFinder from '../../apis/UserFinder'
import UniversityFinder from '../../apis/UniversityFinder';
import { UniversityContext } from '../../context/UniversityContext';
import AddRSO from '../rsos/AddRSO';
import { useNavigate } from "react-router-dom";

function RegisterAdmin(props) {
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
    <div>
      <Fragment>
        <form action=''>
          <select value={university_id} onChange={handleChange}> 
            <option value=""> Select a University </option>
            {unis.map((uni) => (
              <option value={uni.university_id} key={uni.university_id}>{uni.name}</option>))}
          </select>
          <label htmlFor='email'>Email</label>
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
          <button onClick={handleClick}>Sign Up!</button>
        </form>
        <h3>To do: select students</h3>
        <AddRSO/>
      </Fragment>
    </div>
  );
}

export default RegisterAdmin;