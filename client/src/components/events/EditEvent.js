import React, { useState, useEffect, Fragment } from 'react'
import EventFinder from '../../apis/EventFinder'
import { useParams } from "react-router-dom";

const EditEvent = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [length_minutes, setLength] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await EventFinder.get(`/${id}`);
      console.log(response.data.data);
      setName(response.data.data.event.name);
      setCategory(response.data.data.event.category);
      setDescription(response.data.data.event.description);
      setDate(response.data.data.event.date);
      setLength(response.data.data.event.length_minutes);
    };

    fetchData();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedEvent = await EventFinder.put(`/${id}`, {
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

export default EditEvent;