import React, { useContext, useEffect, useState } from 'react';
import EventFinder from '../../apis/EventFinder';
import UserFinder from '../../apis/UserFinder';
import RelationFinder from '../../apis/RelationFinder';
import { Context } from '../../context/Context';
import { useNavigate } from "react-router-dom";
import GetCookie from '../../components/Cookie'

function PrivateEventsPage(props) {
  const [userid, setUserID] = useState("");
  const [access, setAccess] = useState("");
  const [uniid, setUniID] = useState("");
  const [atEvents, setAtEvents] = useState([])
  const { events, setEvents } = useContext(Context);
  // run when this component renders
  //  [] not when any children rerender
  let navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = GetCookie("user_id");
        setUserID(id);
        const perms = GetCookie("access");
        setAccess(perms);
        const uniID = GetCookie("university_id");
        setUniID(uniID);

        const response = await EventFinder.get("/");
        const eventFilter = response.data.data.events.filter(event => {
          return event.visibility === "private";
        });
        setEvents(eventFilter)

        const event = await RelationFinder.get(`/attending/user/${id}`);
        setAtEvents(event.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [])

  const handleEventSelect = (eventid) => { 
    navigate(`/events/${eventid}`)
  }

  const handleDelete = async (e, eventid) => {
    e.stopPropagation();
    try {
      const response = await EventFinder.delete(`/${eventid}`);
      setEvents(
        events.filter((event) => {
          return event.event_id !== eventid;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = (e, eventid) => {
    e.stopPropagation();
    navigate(`/events/${eventid}/edit`);
  };

  const eventAttend = (eventid) => {
    let equal = false;
    atEvents.forEach((e) => {
      if (e.event_id == eventid) {
        equal = true;
        return;
      }
    });
    return equal;
  };

  return (
    <div className="list-group container">
      EventsPage
      <table className="table table-hover table-lg">
        <thead>
          <tr className="bg-secondary text-white">
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Date</th>
            <th>Length</th>
            <th>Visibility</th>
          </tr>
        </thead>
        <tbody>
          {events && 
            events.map((event) => {
              if (event.visibility === "private" && eventAttend(event.event_id)) {
              return (
                <tr onClick={() => handleEventSelect(event.event_id)} key={event.event_id}>
                  <td>{event.name}</td>
                  <td>{event.description}</td>
                  <td>{event.category}</td>
                  <td>{event.date}</td>
                  <td>{event.length_minutes}</td>
                  <td>{event.visibility}</td>
                  <td>
                  {event.admin_id == userid &&
                    <button
                      onClick={(e) => handleUpdate(e, event.event_id)}
                      className="btn btn-lg"
                    >
                      Update
                    </button>
            }
                  </td>
                  <td>
                  {event.admin_id == userid &&
                    <button
                      onClick={(e) => handleDelete(e, event.event_id)}
                      className="btn btn-lg"
                    >
                      Delete
                    </button>
                  }
                  </td>
                </tr>
              )}
          })}
        </tbody>
      </table>
    </div>
  )
}

export default PrivateEventsPage