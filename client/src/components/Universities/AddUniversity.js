import React, { useState, Fragment } from 'react';
import UniversityFinder from '../../apis/UniversityFinder'; // Assuming you have a separate API module for universities
import { useNavigate, Link } from 'react-router-dom';
import "./AddUniversity.css";

const AddUniversity = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [students, setStudents] = useState("");
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await UniversityFinder.post("/", {
        name,
        location,
        description,
        students,
      });
      navigate(`/register/superadmin`)
      //console.log(response.data.rows[0]); // Adjust the response handling according to your API's response structure
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="container">
      <h1 className="title">Add University</h1>
      <form className="form-container">
      <div className="back-button">
          <Link to="/register">Back</Link>
        </div>
        <div>
          <label className="label" htmlFor="name">Name</label>
          <input
            id="name"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
          />
        </div>
        <div>
          <label className="label" htmlFor="location">Location</label>
          <input
            id="location"
            className="input"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type="text"
            placeholder="Location"
          />
        </div>
        <div>
          <label className="label" htmlFor="description">Description</label>
          <input
            id="description"
            className="input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="Description"
          />
        </div>
        <div>
          <label className="label" htmlFor="students">Number of Students</label>
          <input
            id="students"
            className="input"
            value={students}
            onChange={(e) => setStudents(e.target.value)}
            type="number"
            placeholder="Number of Students"
          />
        </div>
        <button
          className="button"
          onClick={handleSubmit}
          type="submit"
        >
          Confirm
        </button>
      </form>
    </div>
  );
}

export default AddUniversity;
