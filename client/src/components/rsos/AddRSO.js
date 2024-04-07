import React, { useState, Fragment } from 'react'
import RSOFinder from '../../apis/RSOFinder'
import "./AddRSO.css";
import { useNavigate, Link } from 'react-router-dom';
import EditUser from '../login/EditUser';
import GetCookie from '../Cookie';

const AddRSO = () => {
  const id = GetCookie("user_id");
  const [name, setName] = useState("");
  const [admin_id, setAdminID] = useState(id);

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
    <div className="container">
      <form className="form-container" action=''>
      <div className="back-arrow">
          <Link to="/welcome">Back</Link>
        </div>
      <h2 className="title">Add RSO</h2>
        <input
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type='text'
          placeholder='Name'
        />
        <input
          className="input"
          value={admin_id}
          onChange={(e) => setAdminID(e.target.value)}
          type='number'
          placeholder='Admin ID'
        />
        <button
          className="button"
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

export default AddRSO;
