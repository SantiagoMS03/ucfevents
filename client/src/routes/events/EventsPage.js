import React, { useContext, useEffect } from 'react';
import EventFinder from '../../apis/EventFinder';
import { Context } from '../../context/Context';
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header.js";
import "./EventsPage.css";

function EventsPage(props) {
  const { events, setEvents } = useContext(Context);
  // run when this component renders
  //  [] not when any children rerender
  let navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await EventFinder.get("/");
        setEvents(response.data.data.events);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [])

  const handleEventSelect = (eventid) => { 
    navigate(`/events/${eventid}`)
  }

  return (
    <div>
      <Header />
      <div className="list-group">
        <table className="table table-hover table-lg">
          <thead>
            <tr className="bg-secondary text-white">
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Date</th>
              <th>Length</th>
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
                  </tr>
                )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EventsPage
