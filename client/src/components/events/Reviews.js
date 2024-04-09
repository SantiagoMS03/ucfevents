import RatingNum from "./RatingNum"
import React, { useState, useEffect } from 'react'
import GetCookies from '../Cookie'
import EventFinder from "../../apis/EventFinder";
import { useNavigate } from "react-router-dom";

const Reviews = ({reviews}) => {
    const [userid, setUserID] = useState("")
    let navigate = useNavigate()

    function refreshPage() {
        window.location.reload(false);
      }

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

    const handleDelete = async (e, userid) => {
        e.stopPropagation();
        try {
          const response = await EventFinder.delete(`/${userid}/reviews`);
          refreshPage() 
        } catch (err) {
          console.log(err);
        }
      };
    
      const handleUpdate = (e, eventid, reviewid) => {
        e.stopPropagation();
        navigate(`/events/${eventid}/${reviewid}`);
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
                                    onClick={(e) => handleUpdate(e, review.event_id ,review.review_id)}
                                    className="btn btn-lg"
                                >
                                    Update
                                </button>
                            }
                        </div>
                        <div>
                            {review.user_id == userid &&
                                <button
                                    onClick={(e) => handleDelete(e, review.user_id)}
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