import React, { useState, Fragment, useContext, useEffect } from 'react'
import RSOFinder from '../../apis/RSOFinder'
import "./AddRSO.css";
import { useNavigate, Link } from 'react-router-dom';
import UserFinder from '../../apis/UserFinder';
import RelationFinder from '../../apis/RelationFinder';
import EditUser from '../login/EditUser';
import GetCookie from '../Cookie';
import { Context } from '../../context/Context';
import Select from 'react-select';
import UserToRSO from './UserToRSO';


const AddRSO = () => {
  const id = GetCookie("user_id");
  const [name, setName] = useState("");
  const [admin_id, setAdminID] = useState(id);
  const [user_id, setUserID] = useState(""); 
  const {users, setUsers} = useContext(Context);
  let navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserFinder.get("/");
        setUsers(response.data.data.users);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleUserSelect = (selectedOptions) => {
    const selectedUserIds = selectedOptions.map(option => option.value);
    setUserID(selectedUserIds);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RSOFinder.post("/", {
        name,
        admin_id
    })
    const rsoID = response.data.data.rso.rso_id;
    EditUser(admin_id);
    UserToRSO(rsoID, user_id, setUserID);
    navigate('/rsos')
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
        <Select
          value={Array.isArray(user_id) ? user_id.map(id => ({ value: id, label: users.find(user => user.user_id === id)?.email })) : []}
          onChange={handleUserSelect}
          options={users.map(user => ({ value: user.user_id, label: user.email, key: user.user_id }))}
          isMulti
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
