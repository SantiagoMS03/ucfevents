const express = require("express");
const router = express.Router();
const db = require("../../db/db");

// Get a all rsos from a university
router.get('/:universityid', async (req, res) => {
    try {
        const {universityid} = req.params;
        const query = `SELECT R.rso_id FROM universityrso UR, rsos R, universities U WHERE U.${universityid} = UR.${universityid} AND R.rso_id = UR.rso_id;`;
        const results = await db.query(query);
        if (results.rows.length === 0) {
            return res.status(404).json({ status: "error", message: "RSOs not found" });
        }
        res.status(200).json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});

