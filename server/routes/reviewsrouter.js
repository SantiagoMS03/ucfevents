const express = require("express");
const router = express.Router();
const db = require("../db");

router.post('/:eventid', async (req, res) => {

    try {
        const { name, review, rating} = req.body;
        const eventInfoQuery = "INSERT INTO reviews (event_id, name, review, rating) VALUES ($1, $2, $3, $4) RETURNING *;"
        const newReview = await db.query(eventInfoQuery, [req.params.eventid, name, review, rating]);

        res.status(201).json({
            status: "success",
            data: {
                review: newReview.rows[0]
            }
        });
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;