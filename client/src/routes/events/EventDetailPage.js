import React, {useContext, useEffect} from 'react';
import {useParams} from "react-router-dom";
import Reviews from "../../components/events/Reviews";
import AddReview from "../../components/events/AddReview";
import { EventsContext } from '../../context/EventsContext';
import EventFinder from "../../apis/EventFinder";

const EventDetailPage = () => {
  const {eventid} = useParams()
  const {selectedEvent, setSelectedEvent} = useContext(EventsContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await EventFinder.get(`/${eventid}`); //issue is here
        console.log(response);
        setSelectedEvent(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      {selectedEvent && (
        <>
        <h1 className="text-center display-1">{selectedEvent.event.name}</h1>
          <div className="mt-3">
            <Reviews reviews={selectedEvent.reviews}/>
          </div>
          <AddReview/>
        </>
      )}
  
    </div>
  )
}

export default EventDetailPage