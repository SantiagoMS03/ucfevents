import React, { useContext, useEffect, useState } from 'react';
import RSOFinder from '../../apis/RSOFinder';
import RelationFinder from '../../apis/RelationFinder';
import { useNavigate } from "react-router-dom";
import { Context } from '../../context/Context';
import GetCookie from '../../components/Cookie';

function RSOsPage(props) {
  const { rsos, setRSOs } = useContext(Context);
  const [members, setMembers] = useState([])
  const id = GetCookie("user_id");
  // run when this component renders
  //  [] not when any children rerender
  let navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RSOFinder.get("/");
        setRSOs(response.data.data.rsos);

        const mems = await RelationFinder.get(`/rsouser/user/${id}`);
        setMembers(mems.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [])

  function refreshPage() {
    window.location.reload(false);
  }

  const handleJoinSelect = async (rsoid) => { 
    try {
      const response = await RelationFinder.post(`/rsouser/${rsoid}/${id}`)
      refreshPage();
    } catch (err) {
      console.log(err);
    }
  }

  const handleLeaveSelect = async (rsoid) => { 
    try {
      const response = await RelationFinder.delete(`/rsouser/${rsoid}/${id}`)
      refreshPage();
    } catch (err) {
      console.log(err);
    }
  }

  const handleNewSelect = () => { 
    navigate(`/newrso`)
  }

  const rsoMember = (rsoid) => {
    let equal = false;
    members.forEach((mem) => {
      if (mem.rso_id === rsoid) {
        equal = true;
        return;
      }
    });
    return equal;
  };

  return (
    <div className="list-group container">
      RSOsPage
      <button onClick={() => handleNewSelect()} >Create new RSO</button>
      <table className="table table-hover table-lg">
        <thead>
          <tr className="bg-secondary text-white">
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {rsos &&
            rsos.map((rso) => {
              return (
                <tr key={rso.rso_id}>
                  <td>{rso.name}</td>
                  <td>
                    {!rsoMember(rso.rso_id) &&
                    <button onClick={() => handleJoinSelect(rso.rso_id)} >
                      Join RSO
                    </button>
                    }
                    {rsoMember(rso.rso_id) &&
                    <button onClick={() => handleLeaveSelect(rso.rso_id)}>
                      Leave RSO
                    </button>
                    }
                  </td>
                </tr>
              )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default RSOsPage