const express = require("express");
const router = express.Router();
const db = require("../../db");

// Get a all events from an rso
router.get('/rso/:rsoid', async (req, res) => {
    try {
        const {rsoid} = req.params;
        const query = `SELECT DISTINCT E.event_id FROM rsoevent RE, rsos R, events E WHERE R.rso_id = RE.rso_id AND R.rso_id = ${rsoid} AND E.event_id = RE.event_id;`;
        const results = await db.query(query);
        res.status(200).json(results.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});

// Get the rso an event is part of
router.get('/event/:eventid', async (req, res) => {
    try {
        const {eventid} = req.params;
        const query = `SELECT DISTINCT R.rso_id FROM rsoevent RE, rsos R, events E WHERE R.rso_id = RE.rso_id AND E.event_id = RE.event_id AND E.event_id = ${eventid};`;
        const results = await db.query(query);
        res.status(200).json(results.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});

router.post('/:rsoid/:eventid', async (req, res) => {
    try {
        const {eventid, rsoid} = req.params;
        const query = `INSERT INTO attending (rso_id, event_id) VALUES ${rsoid}, ${eventid}`;
        const results = await db.query(query);
        res.status(200).json(results.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});

router.delete('/:rsoid/:eventid', async (req, res) => {
    try {
        const {eventid, rsoid} = req.params;
        const query = `DELETE FROM attending * WHERE rso_id = ${rsoid} AND event_id = ${eventid}`;
        const results = await db.query(query);
        res.status(200).json(results.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});

module.exports = router;
