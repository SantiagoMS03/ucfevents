import React, { useEffect, useState, useContext } from 'react';
import Header from'../components/Header.js';
import GetCookie from '../components/Cookie.js';
import UserFinder from '../apis/UserFinder.js';
import UniversityFinder from '../apis/UniversityFinder.js';
import Welcome from '../components/Welcome.js'

function WelcomePage() {
  const id = GetCookie("user_id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserFinder.get(`/${id}`);
        const uniID = response.data.data.users.university_id;
        document.cookie = `university_id=${uniID}; path=/`;
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

    return (
      <div>
        <Header />
        <div>
          {/* Your welcome page content here */}
          <Welcome/>
        </div>
      </div>
    );
  }

export default WelcomePage
