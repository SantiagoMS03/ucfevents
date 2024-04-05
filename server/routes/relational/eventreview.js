const express = require("express");
const router = express.Router();
const db = require("../../db");

// Get a all reviews from an event
router.get('/review/:reviewid', async (req, res) => {
    try {
        const {reviewid} = req.params;
        const query = `SELECT R.review_id FROM eventreview ER, events E, reviews R WHERE R.${reviewid} = RE.${reviewid} AND E.event_id = RE.event_id;`;
        const results = await db.query(query);
        res.status(200).json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});

module.exports = router;