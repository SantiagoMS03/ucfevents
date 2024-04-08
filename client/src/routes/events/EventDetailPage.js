import React, {useContext, useEffect} from 'react';
import {useParams} from "react-router-dom";
import Reviews from "../../components/events/Reviews";
import AddReview from "../../components/events/AddReview";
import { Context } from '../../context/Context';
import EventFinder from "../../apis/EventFinder";

const EventDetailPage = () => {
  const {eventid} = useParams()
  const {selectedEvent, setSelectedEvent} = useContext(Context)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await EventFinder.get(`/${eventid}`);
        console.log(response);
        setSelectedEvent(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleJoinSelect = (rsoid) => { 
    //navigate(`/rsos/${rsoid}`)
  }

  const handleLeaveSelect = (rsoid) => { 
    //navigate(`/rsos/${rsoid}`)
  }
  

  return (
    <div className="container">
      {selectedEvent && (
        <>
        <h1 className="text-center display-1">{selectedEvent.event.name}</h1>
        <div>
          <button onClick={() => handleJoinSelect()} >
            Join RSO
          </button>
          <button onClick={() => handleLeaveSelect()}>
            Leave RSO
          </button>
        </div>
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