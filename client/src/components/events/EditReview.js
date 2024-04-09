import React, { useState, useEffect, Fragment } from 'react'
import EventFinder from '../../apis/EventFinder'
import { useParams } from "react-router-dom";
import GetCookie from '../Cookie';
import { useNavigate } from "react-router-dom";

const EditReview = () => {
    var {eventid, reviewid} = useParams();
    const [name, setName] = useState("");
    const [reviewComment, setReviewComment] = useState("");
    const [rating, setRating] = useState("Rating");
    const [userid, setUserID] = useState("")
    const id = GetCookie("user_id");
    let navigate = useNavigate()

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await EventFinder.get(`/${eventid}`);
//         const eventData = response.data.data.reviews;
//         console.log(eventData)
//         setUserID(eventData.user_id);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchData();
//   },);


  const handleSubmitReview = async (e) => {
    e.preventDefault()
    console.log(userid);
    try {
        const response = await EventFinder.put(`/${eventid}/${id}/${reviewid}/reviews`, {
            name,
            review: reviewComment,
            rating
        });
        navigate(`/events/${eventid}`);
    } catch (err) {
    }
};

  return (
    <div className="mb-2 container">
            <form action="">
                <div className="form-row">
                    <div className="form-group col-8">
                        <label htmlFor="name">Name</label>
                        <input value={name} onChange={e => setName(e.target.value)}
                            id="name" placeholder="name" type="text" className="form-control"></input>
                    </div>
                    <div className="form=group col-4">
                        <label htmlFor="rating">Rating</label>
                        <select value={rating} onChange={e => setRating(e.target.value)}
                        id="rating" className="custom-select">
                            <option disabled>Rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="Review">Comment</label>
                    <textarea value={reviewComment} onChange={e => setReviewComment(e.target.value)}
                    id="Review" className="form-control"></textarea>
                </div>
                <button type = "submit" onClick={handleSubmitReview} className="btn btn-lg">Submit</button>
            </form>
        </div>
  )
}

export default EditReview;
