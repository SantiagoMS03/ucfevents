const express = require("express");
const router = express.Router();
const db = require("../db");

router.post('/:eventid', async (req, res) => {

    try {
        const { name, comment, rating} = req.body;
        const eventInfoQuery = "INSERT INTO reviews (event_id, name, comment, rating) VALUES ($1, $2, $3, $4) RETURNING *;"
        const newReview = await db.query(eventInfoQuery, [req.params.eventid, name, comment, rating]);

        res.status(201).json({
            status: "success",
            data: {
                event: newReview.rows[0]
            }
        });
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;