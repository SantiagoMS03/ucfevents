import React from 'react';
import { useNavigate, useEffect } from "react-router-dom";
import Header from'../components/Header.js';
import GetCookie from '../components/login/Cookie.js';

function WelcomePage() {

  //const id = GetCookie("user_id");
  // console.log(id)
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await EventFinder.get(`/${}`);
  //       console.log(response);
  //       setSelectedEvent(response.data.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   fetchData();
  // }, []);

    return (
      <div>
        <Header />
        <div>
          {/* Your welcome page content here */}
          <h1>Welcome to our website!</h1>
          <p>This is the welcome page content.</p>
        </div>
      </div>
    );
  }
  

export default WelcomePage
