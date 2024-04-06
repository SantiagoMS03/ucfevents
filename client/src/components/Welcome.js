import React, { useEffect, useState, useContext } from 'react';
import Header from'../components/Header.js';
import GetCookie from '../components/Cookie.js';
import UserFinder from '../apis/UserFinder.js';
import UniversityFinder from '../apis/UniversityFinder.js';
import { UniversityContext } from '../context/UniversityContext.js'

const Welcome = () => {
  //const[unis, setUnis] = useState([])
  const {unis, setUnis} = useContext(UniversityContext)
  const id = GetCookie("user_id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const university_id = GetCookie("university_id");
        const uni = await UniversityFinder.get(`/${university_id}`)
        setUnis(uni.data.data.university);

      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

    return (
      <div>
        <div>
          {/* Your welcome page content here */}
          <h1>Welcome to {unis.name}'s Registered Student Organization Page</h1>
          <p>Location: {unis.location}</p>
          <p>{unis.description}</p>
          <p>Student Body Size: {unis.students}</p>
        </div>
      </div>
    );
  }

export default Welcome