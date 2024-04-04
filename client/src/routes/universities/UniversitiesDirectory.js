import React, { useEffect, useState } from 'react';
import UniversityFinder from '../../apis/UniversityFinder';
import { useNavigate } from "react-router-dom";

function UniversityPage(props) {
  const [universities, setUniversities] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UniversityFinder.get("/");
        setUniversities(response.data.data.universities);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleUniversitySelect = (universityId) => { 
    navigate(`/universities/${universityId}`);
  }

  return (
    <div className="list-group container">
      <h1>Universities Directory</h1>
      <table className="table table-hover table-lg">
        <thead>
          <tr className="bg-secondary text-white">
            <th>Name</th>
            <th>Description</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {universities.map((university) => (
            <tr onClick={() => handleUniversitySelect(university.university_id)} key={university.university_id}>
              <td>{university.name}</td>
              <td>{university.description}</td>
              <td>{university.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UniversityPage;
