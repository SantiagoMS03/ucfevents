import React, { useState, Fragment } from 'react'
import RSOFinder from '../../apis/RSOFinder'
import EditUser from '../login/EditUser';

const AddRSO = () => {
  const [name, setName] = useState("");
  const [admin_id, setAdminID] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RSOFinder.post("/", {
        name,
        admin_id
    })
    EditUser();
      console.log(response.data.rows[0]);
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
            value={admin_id}
            onChange={(e) => setAdminID(e.target.value)}
            type='number'
            placeholder='admin_id'
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

export default AddRSO;