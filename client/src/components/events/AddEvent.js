import React, { useState, Fragment, useContext, useEffect } from 'react'
import EventFinder from '../../apis/EventFinder'
import "./AddEvent.css";
import { RSOContext } from '../../context/RSOContext';
import RSOFinder from '../../apis/RSOFinder';
import { useNavigate } from "react-router-dom";

const AddEvent = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [length_minutes, setLength] = useState("");
  const [rso_id, setRSOId] = useState("");
  const [visibility, setVisibility] = useState("");
  const { rsos, setRSOs } = useContext(RSOContext);

  let navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
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
      const response = await EventFinder.post("/", {
        name,
        category,
        description,
        date,
        length_minutes,
        rso_id,
        visibility
      })
      navigate('/events')
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
      <form action=''>
        <div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type='text'
            placeholder='name'
          />
        </div>
        <div>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            type='text'
            placeholder='category'
          />
        </div>
        <div>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type='text'
            placeholder='description'
          />
        </div>
        <div>
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type='date'
            placeholder='date'
          />
        </div>
        <div>
          <input
            value={length_minutes}
            onChange={(e) => setLength(e.target.value)}
            type='number'
            placeholder='length'
          />
        </div>
        <div>
        <select value={rso_id} onChange={handleRSOChange}> 
            <option value=""> Select an RSO </option>
            {rsos.map((rso) => (
              <option value={rso.rso_id} key={rso.rso_id}>{rso.name}</option>))}
          </select>
        </div>
        <div>
          <select value={visibility} onChange={handleVisChange}> 
            <option value=""> Select Visibility </option>
            <option value="private">Private</option>
            <option value="public">Pulbic</option>
            <option value="rso">Rso Event</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          type='submit'
        >
        Confirm
        </button>
      </form>
    </Fragment>
  )
}

export default AddEvent;
