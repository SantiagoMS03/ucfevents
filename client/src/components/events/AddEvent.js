import React, { useState, Fragment, useContext, useEffect } from 'react'
import EventFinder from '../../apis/EventFinder'
import "./AddEvent.css";
import { Context } from '../../context/Context';
import RSOFinder from '../../apis/RSOFinder';
import { useNavigate, Link } from "react-router-dom";

import GetCookies from '../Cookie'
import { useNavigate, useParams } from "react-router-dom";

const AddEvent = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [length_minutes, setLength] = useState("");
  const [rso_id, setRSOId] = useState("");
  const [visibility, setVisibility] = useState("");
  const [adminid, setAdminID] = useState("")
  const {rsoid} = useParams();
  const { rsos, setRSOs } = useContext(Context);

  let navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = GetCookies("user_id");
        setAdminID(id);

        const response = await RSOFinder.get("/");
        setRSOs(response.data.data.rsos);
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await  EventFinder.post(`/${adminid}/${rsoid}`, {
        name,
        category,
        description,
        date,
        length_minutes,
        visibility
      })
      navigate('/rsos')
    } catch (err) {
      console.log(err);
    }
  }

  const handleRSOChange = (e) => {
    setRSOId(e.target.value);
    console.log(e.target.value)
  }

  const handleVisChange = (e) => {
    setVisibility(e.target.value);
    console.log(e.target.value)
  }

  return (
    <Fragment>
      <div className="container">
        <form className="form-container" action=''>
        <div className="back-button">
          <Link to="/welcome">Back</Link>
        </div>
        <h2 className="title">Add Event</h2>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type='text'
            placeholder='Name'
          />
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            type='text'
            placeholder='Category'
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type='text'
            placeholder='Description'
          />
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type='date'
            placeholder='Date'
          />
          <input
            value={length_minutes}
            onChange={(e) => setLength(e.target.value)}
            type='number'
            placeholder='Length'
          />
        </div>
        <div>
        {/* <select value={rso_id} onChange={handleRSOChange}> 
            <option value=""> Select an RSO </option>
            {rsos.map((rso) => (
              <option value={rso.rso_id} key={rso.rso_id}>{rso.name}</option>))}
          </select> */}
        </div>
        <div>
          <select value={visibility} onChange={handleVisChange}> 
            <option value=""> Select Visibility </option>
            <option value="private">Private</option>
            <option value="public">Public</option>
            <option value="rso">RSO Event</option>
          </select>
          <button
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

export default AddEvent;
