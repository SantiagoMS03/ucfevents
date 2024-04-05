const express = require("express");
const router = express.Router();
const db = require("../../db");

// Get all attendees of an event
router.get('/event/:eventid', async (req, res) => {
    try {
        const {eventid} = req.params;
        const query = `SELECT U.user_id FROM eventuser EU, events E, users U WHERE E.${eventid} = EU.${eventid} AND U.user_id = EU.user_id;`;
        const results = await db.query(query);
        res.status(200).json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});

// Get events a user is attending
router.get('/user/:userid', async (req, res) => {
    try {
        const {userid} = req.params;
        const query = `SELECT E.event_id FROM eventuser EU, events E, users U WHERE U.${userid} = EU.${userid} AND E.event_id = EU.event_id;`;
        const results = await db.query(query);
        res.status(200).json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});

module.exports = router;
