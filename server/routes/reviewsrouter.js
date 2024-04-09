const express = require("express");
const router = express.Router();
const db = require("../db");

router.post('/:eventid/:userid/reviews', async (req, res) => {

    try {
        const { name, review, rating } = req.body;
        const eventInfoQuery = "INSERT INTO reviews (event_id, name, review, rating, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *;"
        const newReview = await db.query(eventInfoQuery, [req.params.eventid, name, review, rating, req.params.userid]);

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

// // update comment
router.put('/:eventid/:userid/:reviewid/reviews', async (req, res) => {
    try {
        const { name, review, rating } = req.body;
        const query = "UPDATE reviews SET name = $1, review = $2, rating = $3, event_id = $4, user_id = $5 WHERE review_id = $6 RETURNING *"
        const results = await db.query(query, [name, review, rating, req.params.eventid, req.params.userid, req.params.reviewid]);
        res.status(200).json({
        status: "success",
        data: {
            event: results.rows[0]
        }
        });
    } catch (err) {
        console.log(err);
    }
    })
    
//delete comment
    router.delete('/:userid/reviews', async (req, res) => {
    try {
        const results = await db.query("DELETE FROM reviews WHERE user_id = $1", [req.params.userid]);
        res.status(204).json({
        status: "success"
        });
    } catch (err) {
        console.log(err);
    }
    })

module.exports = router;