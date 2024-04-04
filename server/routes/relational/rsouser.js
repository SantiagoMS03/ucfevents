const express = require("express");
const router = express.Router();
const db = require("../../db/db");

// Get a all users that are part of an rso
router.get('/:rsoid', async (req, res) => {
    try {
        const {rsoid} = req.params;
        const query = `SELECT U.user_id FROM rsouser RU, rsos R, users U WHERE R.${rsoid} = RU.${rsoid} AND U.user_id = RU.user_id;`;
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

