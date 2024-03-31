import React, { useContext, useEffect } from 'react';
import EventFinder from '../../apis/EventFinder';
import { useNavigate } from "react-router-dom";

function RSOsPage(props) {
  const { rsos, setRSOs } = useContext(RSOsContext);
  // run when this component renders
  //  [] not when any children rerender
  let navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await EventFinder.get("/");
        setRSOs(response.data.data.rsos);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [])

  const handleEventSelect = (rsoid) => { 
    navigate(`/rsos/${rsoid}`)
  }

  return (
    <div className="list-group container">
      RSOsPage
      <table className="table table-hover table-lg">
        <thead>
          <tr className="bg-secondary text-white">
            <th>Name</th>
            <th>AdminID</th>
          </tr>
        </thead>
        <tbody>
          {rsos &&
            rsos.map((rso) => {
              return (
                <tr onClick={() => handleEventSelect(rso.rso_id)} key={rso.rso_id}>
                  <td>{rso.name}</td>
                  <td>{rso.admin_id}</td>
                </tr>
              )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default RSOsPage