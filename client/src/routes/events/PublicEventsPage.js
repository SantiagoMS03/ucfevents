import React, { useContext, useEffect, useState } from 'react';
import EventFinder from '../../apis/EventFinder';
import UserFinder from '../../apis/UserFinder';
import { Context } from '../../context/Context';
import { useNavigate } from "react-router-dom";
import GetCookies from '../../components/Cookie';
import Header from "../../components/Header.js";

function PublicEventsPage(props) {
  const [userid, setUserID] = useState("");
  const [access, setAccess] = useState("");
  const [uniid, setUniID] = useState("");
  const { events, setEvents } = useContext(Context);
  // run when this component renders
  //  [] not when any children rerender
  let navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = GetCookies("user_id");
        setUserID(id);
        const perms = GetCookies("access");
        setAccess(perms);
        const uniID = GetCookies("university_id");
        setUniID(uniID);

        const response = await EventFinder.get("/");
        const eventPublic = response.data.data.events.filter(event => {
          return event.visibility === "public";
        });
        setEvents(eventPublic)
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

  return (
    <div>
        <Header />
    <div className="list-group container">
      <table className="table table-hover table-lg">
        <thead>
          <tr className="bg-secondary text-white">
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Date</th>
            <th>Length</th>
            <th>Type</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {events && 
            events.map((event) => {
              return (
                <tr onClick={() => handleEventSelect(event.event_id)} key={event.event_id}>
                  <td>{event.name}</td>
                  <td>{event.description}</td>
                  <td>{event.category}</td>
                  <td>{event.date}</td>
                  <td>{event.length_minutes}</td>
                  <td>{event.visibility}</td>
                  <td>{event.location}</td>
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
              )
          })}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default PublicEventsPage
