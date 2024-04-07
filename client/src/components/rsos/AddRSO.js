import React, { useState, Fragment } from 'react'
import RSOFinder from '../../apis/RSOFinder'
import EditUser from '../login/EditUser';
import GetCookie from '../Cookie';

const AddRSO = () => {
  const id = GetCookie("user_id");
  const [name, setName] = useState("");
  const [admin_id, setAdminID] = useState({id});

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