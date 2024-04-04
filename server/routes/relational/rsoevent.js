const express = require("express");
const router = express.Router();
const db = require("../../db/db");

// Get a all events from an rso
router.get('/:rsoid', async (req, res) => {
    try {
        const {rsoid} = req.params;
        const query = `SELECT E.event_id FROM rsoevent RE, rsos R, events E WHERE R.${rsoid} = RE.${rsoid} AND E.event_id = RE.event_id;`;
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

