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
// router.put('/:eventid', async (req, res) => {
//     try {
//         console.log("here!")
//         const { name, category, description, date, length_minutes, rso_id, visibility } = req.body;
//         const query = "UPDATE events SET name = $1, category = $2, description = $3, date = $4, length_minutes = $5, , rso_id = $6, visibility = $7 WHERE event_id = $8 RETURNING *"
//         const results = await db.query(query, [name, category, description, date, length_minutes, rso_id, visibility, req.params.eventid]);
//         res.status(200).json({
//         status: "success",
//         data: {
//             event: results.rows[0]
//         }
//         });
//     } catch (err) {
//         console.log(err);
//     }
//     })
    
//     // delete comment
//     router.delete('/:eventid', async (req, res) => {
//     try {
//         const results = await db.query("DELETE FROM events WHERE event_id = $1", [req.params.eventid]);
//         res.status(204).json({
//         status: "success"
//         });
//     } catch (err) {
//         console.log(err);
//     }
//     })

module.exports = router;