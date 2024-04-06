const express = require("express");
const router = express.Router();
const db = require("../../db");

// Get a all events from a university
router.get('/university/:universityid', async (req, res) => {
    try {
        const {universityid} = req.params;
        const query = `SELECT DISTINCT E.event_id FROM universityrso UR, rsos R, universities U, rsoevent RE, events E WHERE U.university_id = UR.university_id AND U.university_id = ${universityid} AND R.rso_id = UR.rso_id AND RE.event_id = E.event_id;`;
        const results = await db.query(query);
        res.status(200).json(results.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});

// Get an event's university
router.get('/event/:eventid', async (req, res) => {
    try {
        const {eventid} = req.params;
        const query = `SELECT DISTINCT U.university_id FROM universityrso UR, rsos R, universities U, rsoevent RE, events E WHERE U.university_id = UR.university_id AND R.rso_id = UR.rso_id AND RE.rso_id = R.rso_id AND RE.event_id = E.event_id AND E.event_id = ${eventid};`;
        const results = await db.query(query);
        res.status(200).json(results.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});

module.exports = router;
