const express = require("express");
const router = express.Router();
const db = require("../../db");

// Get all attendees of an event
router.get('/event/:eventid', async (req, res) => {
    try {
        const {eventid} = req.params;
        const query = `SELECT U.user_id FROM attending A, events E, users U WHERE E.event_id = A.event_id AND E.event_id = ${eventid} AND U.user_id = A.user_id;`;
        const results = await db.query(query);
        res.status(200).json(results.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});

// Get events a user is attending
router.get('/user/:userid', async (req, res) => {
    try {
        const {userid} = req.params;
        const query = `SELECT E.event_id FROM attending A, events E, users U WHERE U.user_id = A.user_id AND U.user_id = ${userid} AND E.event_id = A.event_id;`;
        const results = await db.query(query);
        res.status(200).json(results.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});

module.exports = router;
