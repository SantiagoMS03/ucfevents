import React, { useState, useEffect, Fragment } from 'react'
import RSOFinder from '../../apis/RSOFinder'
import { useParams } from "react-router-dom";

const EditRSO = () => {
  const { rso_id } = useParams();
  const [name, setName] = useState("");
  const [adminID, setAdminID] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RSOFinder.get(`/${rso_id}`);
        const rsoData = response.data.data.rso;
        setName(rsoData.name);
        setAdminID(rsoData.adminID);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [rso_id]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedRSO = await RSOFinder.put(`/${rso_id}`, {
        name,
        adminID
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
            value={adminID}
            onChange={(e) => setAdminID(e.target.value)}
            type='number'
            placeholder='adminID'
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

export default EditRSO;
