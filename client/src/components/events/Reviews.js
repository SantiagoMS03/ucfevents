import RatingNum from "./RatingNum"
import React, { useState, useEffect } from 'react'
import GetCookies from '../Cookie'

const Reviews = ({reviews}) => {
    const [userid, setUserID] = useState("")

    useEffect(() => {
        const fetchData = async () => {
          try {
                const id = GetCookies("user_id");
                setUserID(id);
          } catch (err) {
            console.log(err);
          }
        };
        fetchData();
      }, []);

    const handleDelete = async (e, reviewid) => {
        e.stopPropagation();
        // try {
        //   const response = await EventFinder.delete(`/${eventid}`);
        //   setEvents(
        //     events.filter((event) => {
        //       return event.event_id !== eventid;
        //     })
        //   );
        // } catch (err) {
        //   console.log(err);
        // }
      };
    
      const handleUpdate = (e, reviewid) => {
        e.stopPropagation();
        // navigate(`/events/${eventid}/edit`);
      };

    return (
        <div className="row row-cols-3 mb-2 container">
            {reviews.map((review) => {
                return(
                    <div key={review.review_id}
                        className="card bg-light mb-3" style={{maxWidth: "30%"}}>
                    <div className="card-header d-flex justify-content-between">
                        <span>{review.name}</span>
                        <span><RatingNum rating={review.rating}/></span>
                    </div>
                    <div className="card-body">
                        <p className="card-text">{review.review}</p>
                    </div>
                    <div>
                            {review.user_id == userid &&
                                <button
                                    onClick={(e) => handleUpdate(e, review.review_id)}
                                    className="btn btn-lg"
                                >
                                    Update
                                </button>
                            }
                        </div>
                        <div>
                            {review.user_id == userid &&
                                <button
                                    onClick={(e) => handleDelete(e, review.review_id)}
                                    className="btn btn-lg"
                                >
                                    Delete
                                </button>
                            }
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default Reviews