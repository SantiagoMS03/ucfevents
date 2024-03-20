import React, { useContext, useEffect } from 'react'
import EventFinder from '../../apis/EventFinder'
import { EventsContext } from '../../context/EventsContext';

function EventsPage(props) {
  const { events, setEvents } = useContext(EventsContext)
  // run when this component renders
  //  [] not when any children rerender
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
          </tr>
        </thead>
        <tbody>
          {events &&
            events.map((event) => {
              return (
                <tr key={event.event_id}>
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
  )
}

export default EventsPage