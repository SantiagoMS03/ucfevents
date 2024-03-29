import React from 'react'
import RatingNum from "./RatingNum"

const Reviews = ({reviews}) => {
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
                    </div>
                )
            })}
        </div>
    );
};

export default Reviews