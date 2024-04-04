import React, { useState, Fragment } from 'react';
import UniversityFinder from '../../apis/UniversityFinder'; // Assuming you have a separate API module for universities
import { useNavigate } from "react-router-dom";

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
    <Fragment>
      <form action=''>
        <div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type='text'
            placeholder='Name'
          />
        </div>
        <div>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type='text'
            placeholder='Location'
          />
        </div>
        <div>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type='text'
            placeholder='Description'
          />
        </div>
        <div>
          <input
            value={students}
            onChange={(e) => setStudents(e.target.value)}
            type='number'
            placeholder='Number of Students'
          />
        </div>
        <button
          onClick={handleSubmit}
          type='submit'
        >Confirm
        </button>
      </form>
    </Fragment>
  )
}

export default AddUniversity;
