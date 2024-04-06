import React, { useState, useEffect, Fragment } from 'react';
import UniversityFinder from '../../apis/UniversityFinder'; // Assuming you have a separate API module for universities
import { useParams, Link } from "react-router-dom";
import "./EditUniversity.css";

const EditUniversity = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [ranking, setRanking] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UniversityFinder.get(`/${id}`);
        const universityData = response.data.data.university;
        setName(universityData.name);
        setLocation(universityData.location);
        setDescription(universityData.description);
        setRanking(universityData.ranking);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUniversity = await UniversityFinder.put(`/${id}`, {
        name,
        location,
        description,
        ranking
      });
      console.log(updatedUniversity.data.data.university); // Adjust the response handling according to your API's response structure
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Fragment>
      <div className="container">
        <form className="form-container" action=''>
        <div className="back-button">
          <Link to="/welcome">Back</Link>
        </div>
          <h2 className="title">Edit University</h2>
          <div>
            <input
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type='text'
              placeholder='Name'
            />
          </div>
          <div>
            <input
              className="input"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type='text'
              placeholder='Location'
            />
          </div>
          <div>
            <input
              className="input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type='text'
              placeholder='Description'
            />
          </div>
          <div>
            <input
              className="input"
              value={ranking}
              onChange={(e) => setRanking(e.target.value)}
              type='number'
              placeholder='Ranking'
            />
          </div>
          <button
            className="button"
            onClick={handleSubmit}
            type='submit'
          >
            Confirm
          </button>
        </form>
      </div>
    </Fragment>
  )
}

export default EditUniversity;
