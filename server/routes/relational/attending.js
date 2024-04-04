const express = require("express");
const router = express.Router();
const db = require("../../db/db");

// Get all events user is attending
router.get('/:eventid', async (req, res) => {
    try {
        const {eventid} = req.params;
        const query = `SELECT E.event_id FROM eventuser EU, events E, users U WHERE E.${eventid} = EU.${eventid} AND U.user_id = EU.user_id;`;
        const results = await db.query(query);
        if (results.rows.length === 0) {
            return res.status(404).json({ status: "error", message: "Users not found" });
        }
        res.status(200).json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});

