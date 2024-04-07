import React, { useContext, useEffect } from 'react';
import RSOFinder from '../../apis/RSOFinder';
import { useNavigate } from "react-router-dom";
import { Context } from '../../context/Context';

function RSOsPage(props) {
  const { rsos, setRSOs } = useContext(Context);
  // run when this component renders
  //  [] not when any children rerender
  let navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RSOFinder.get("/");
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
      <button>Create new RSO</button>
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
                <tr onClick={() => handleEventSelect(rso.rso_id)} key={rso.rso_id}>
                  <td>{rso.name}</td>
                  <td>
                    <button>
                      Join RSO
                    </button>
                  </td>
                  <td>
                    <button>
                      Leave RSO
                    </button>
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