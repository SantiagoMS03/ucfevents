import React from 'react';
import {useParams} from "react-router-dom";
import Reviews from "../../components/events/Reviews";
import AddReview from "../../components/events/AddReview";

const EventDetailPage = () => {
  return (
    <div>
      <div className="mt-3">
          <Reviews/>
      </div>
      <AddReview/>
    </div>
  )
}

export default EventDetailPage