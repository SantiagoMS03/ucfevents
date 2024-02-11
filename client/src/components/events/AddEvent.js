import React, { useState, Fragment } from 'react'
import EventFinder from '../../apis/EventFinder'

const AddEvent = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [length, setLength] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("here!")
      const response = await EventFinder.post("/", {
        name,
        category,
        description,
        date,
        length
      })
      console.log(response.data.rows[0]);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Fragment>
      Hello!
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
            value={length}
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

export default AddEvent;