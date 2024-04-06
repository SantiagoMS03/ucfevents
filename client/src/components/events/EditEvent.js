import React, { useState, useEffect, Fragment } from 'react'
import EventFinder from '../../apis/EventFinder'
import { useParams, Link } from "react-router-dom";
import '../../routes/events/EditEventPage.css';

const EditEvent = () =>  {
  const { eventid } = useParams();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [length_minutes, setLength] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await EventFinder.get(`/${eventid}`);
        const eventData = response.data.data.event;
        setName(eventData.name);
        setCategory(eventData.category);
        setDescription(eventData.description);
        setDate(eventData.date);
        setLength(eventData.length_minutes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [eventid]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedEvent = await EventFinder.put(`/${eventid}`, {
        name,
        category,
        description,
        date,
        length_minutes
      })
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Fragment>
      <div className="container">
        <form className="form-container" onSubmit={handleSubmit}>
        <div className="back-button">
          <Link to="/welcome">Back</Link>
        </div>
        <h2 className="title">Edit Event</h2>
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
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              type='text'
              placeholder='Category'
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
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type='date'
              placeholder='Date'
            />
          </div>
          <div>
            <input
              className="input"
              value={length_minutes}
              onChange={(e) => setLength(e.target.value)}
              type='number'
              placeholder='Length'
            />
          </div>
          <button
            className="button"
            type='submit'
          >
            Confirm
          </button>
        </form>
      </div>
    </Fragment>
  )
}

export default EditEvent;
