import React, { useState, useEffect } from 'react'
import EventFinder from "../../apis/EventFinder";
import { useParams } from "react-router-dom";
import GetCookies from '../Cookie'
import Header from '../Header.js';

const AddReview = () => {

    const {eventid} = useParams();
    const [name, setName] = useState("");
    const [reviewComment, setReviewComment] = useState("");
    const [rating, setRating] = useState("Rating");
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
    
   
    function refreshPage() {
        window.location.reload(false);
      }

    const handleSubmitReview = async (e) => {
        e.preventDefault()
        console.log(userid);
        try {
            const response = await EventFinder.post(`/${eventid}/${userid}/reviews`, {
                name,
                review: reviewComment,
                rating
            });
            refreshPage();
        } catch (err) {
        }
    };

    return (
        
        <div className="mb-2 container">
        <h2 className="title1">Add Review</h2>
<form action="" className="form-container">
    <div className="form-row">
      <div className="form-group col-8">
        <label htmlFor="name">Name</label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          id="name"
          placeholder="name"
          type="text"
          className="input"
        />
      </div>
      <div className="form-group col-4">
        <label htmlFor="rating">Rating</label>
        <select
          value={rating}
          onChange={e => setRating(e.target.value)}
          id="rating"
          className="custom-select input"
        >
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
      <textarea
        value={reviewComment}
        onChange={e => setReviewComment(e.target.value)}
        id="Review"
        className="input"
      ></textarea>
    </div>
    <button type="submit" onClick={handleSubmitReview} className="button">
      Submit
    </button>
  </form>
</div>

    )
}

export default AddReview
