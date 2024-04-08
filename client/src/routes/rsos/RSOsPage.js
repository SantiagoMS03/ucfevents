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

  // const handleEventSelect = (rsoid) => { 
  //   navigate(`/rsos/${rsoid}`)
  // }

  const handleJoinSelect = (rsoid) => { 
    //navigate(`/rsos/${rsoid}`)
  }

  const handleLeaveSelect = (rsoid) => { 
    //navigate(`/rsos/${rsoid}`)
  }

  const handleNewSelect = (rsoid) => { 
    navigate(`/newrso`)
  }

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
                <tr>
                  <td>{rso.name}</td>
                  <td>
                    <button onClick={() => handleJoinSelect()} >
                      Join RSO
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleLeaveSelect()}>
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