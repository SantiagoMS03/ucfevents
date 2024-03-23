import React from 'react'
import RatingNum from "./RatingNum"

const Reviews = ({reviews}) => {
    return (
        <div className="row row-cols-3 mb-2">
            <div className="card bg-light mb-3" style={{maxWidth: "30%"}}>
                <div className="card-header d-flex justify-content-between">
                    <span>Joan</span>
                    <span><RatingNum rating={3}/></span>
                </div>
                <div className="card-body">
                    <p className="card-text">Loveee.</p>
                </div>
            </div>
        </div>
    );
};

export default Reviews