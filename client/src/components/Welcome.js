import React, { useEffect, useState, useContext } from 'react';
import Header from'../components/Header.js';
import GetCookie from '../components/Cookie.js';
import UserFinder from '../apis/UserFinder.js';
import UniversityFinder from '../apis/UniversityFinder.js';
import { UniversityContext } from '../context/UniversityContext.js'
import './Welcome.css';

const Welcome = () => {
  //const[unis, setUnis] = useState([])
  const [unis, setUnis] = useState("")
  const id = GetCookie("user_id");

  function refreshPage() {
    window.location.reload(false);
  }

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
        <div className="container7">
          <div>
            <h1 className="title2">Welcome to {unis.name}'s Registered Student Organization Page</h1>
            <p className="info2"><span className="bold large">Location:</span><br />{unis.location}</p>
            <p className="info2"><span className="bold large">Description:</span> <br />{unis.description}</p>
            <p className="info2"><span className="bold large">Student Body Size:</span> <br />{unis.students}</p> 
          </div>
        </div>
      );
  }

export default Welcome
