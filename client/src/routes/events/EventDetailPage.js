import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Reviews from "../../components/events/Reviews";
import AddReview from "../../components/events/AddReview";
import { Context } from '../../context/Context';
import EventFinder from "../../apis/EventFinder";
import RelationFinder from '../../apis/RelationFinder';
import GetCookie from '../../components/Cookie';
import Header from '../../components/Header.js';
import './EventDetailPage.css';

const EventDetailPage = () => {
  const {eventid} = useParams();
  const {selectedEvent, setSelectedEvent} = useContext(Context);
  const [events, setEvents] = useState([])
  const id = GetCookie("user_id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await EventFinder.get(`/${eventid}`);
        console.log(response);
        setSelectedEvent(response.data.data);

        const event = await RelationFinder.get(`/attending/user/${id}`);
        setEvents(event.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleJoinSelect = async (selected) => { 
  //   try {
  //     const response = await RelationFinder.post(`/${rsoid}/${id}`)
  //     refreshPage();
  //   } catch (err) {
  //     console.log(err);
  //   }
  }

  const handleLeaveSelect = async (selected) => { 
  //   try {
  //     const response = await RelationFinder.delete(`/${rsoid}/${id}`)
  //     refreshPage();
  //   } catch (err) {
  //     console.log(err);
  //   }
  }

  const eventAttend = (eventid) => {
    let equal = false;
    events.forEach((e) => {
      if (e.event_id == eventid) {
        equal = true;
        return;
      }
    });
    return equal;
  };

  return (
    <div>
    <Header />
    <div className="container">
      {selectedEvent && (
        <>
          <h1 className="text-center display-1">{selectedEvent.event.name}</h1>
          <div className="btn-group mt-3" role="group">
            {!eventAttend(eventid) && (
              <button className="btn btn-primary" onClick={() => handleJoinSelect(eventid)}>
                Attend Event
              </button>
            )}
            {eventAttend(eventid) && (
              <button className="btn btn-danger" onClick={() => handleLeaveSelect(eventid)}>
                Leave Event
              </button>
            )}
          </div>
          <div className="mt-3">
            <Reviews reviews={selectedEvent.reviews} />
          </div>
          <div className="mt-3">
            <AddReview />
          </div>
        </>
      )}
    </div>
  </div>

  )
}

export default EventDetailPage
