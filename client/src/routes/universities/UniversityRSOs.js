import React, { useContext, useEffect } from 'react';
import RSOFinder from '../../apis/RSOFinder';
import { useNavigate, useParams } from "react-router-dom";

function RSOsPage(props) {
  const { rsos, setRSOs } = useContext(RSOsContext);
  // run when this component renders
  //  [] not when any children rerender
  let navigate = useNavigate();
  const {universityid} = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RSOFinder.get(`/${universityid}`);
        setRSOs(response.data.data.rsos);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [])

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