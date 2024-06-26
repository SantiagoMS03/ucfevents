import React, { useState, Fragment, useContext, useEffect } from 'react'
import EventFinder from '../../apis/EventFinder'
// import { useParams } from "react-router-dom";
import "./AddEvent.css";
import { Context } from '../../context/Context';
import RSOFinder from '../../apis/RSOFinder';
import { useNavigate, Link, useParams } from "react-router-dom";
import GetCookies from '../Cookie'


const AddEvent = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [length_minutes, setLength] = useState("");
  const [location, setLocation] = useState("");
  const [contact_email, setEmail] = useState("");
  const [contact_phone, setPhone] = useState("");
  const [constraint, setConstraint] = useState("");
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
        visibility,
        location,
        contact_email,
        contact_phone
      })
      navigate('/rsos')
    } catch (err) {
      console.log(err);
      setConstraint(err.response.data.message);
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
        {constraint && <div className="error-message text-danger">*{constraint}</div>}
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
            placeholder='Time Length'
          />
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type='text'
            placeholder='Location'
          />
          <input
            value={contact_email}
            onChange={(e) => setEmail(e.target.value)}
            type='text'
            placeholder='Contact Email'
          />
          <input
            value={contact_phone}
            onChange={(e) => setPhone(e.target.value)}
            type='text'
            placeholder='Contact Phone Number'
          />
        <div>
        {/* <select value={rso_id} onChange={handleRSOChange}> 
            <option value=""> Select an RSO </option>
            {rsos.map((rso) => (
              <option value={rso.rso_id} key={rso.rso_id}>{rso.name}</option>))}
          </select> */}
        </div>
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
  );

}

export default AddEvent;
