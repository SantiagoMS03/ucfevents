const express = require("express");
const router = express.Router();
const db = require("../../db/db");

// Get a all reviews from an event
router.get('/:reviewid', async (req, res) => {
    try {
        const {reviewid} = req.params;
        const query = `SELECT R.review_id FROM eventreview ER, events E, reviews R WHERE R.${reviewid} = RE.${reviewid} AND E.event_id = RE.event_id;`;
        const results = await db.query(query);
        if (results.rows.length === 0) {
            return res.status(404).json({ status: "error", message: "Events not found" });
        }
        res.status(200).json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});

