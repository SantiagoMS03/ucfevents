const express = require("express");
const router = express.Router();
const db = require("../../db");

// Get a all users that are part of an rso
router.get('/rso/:rsoid', async (req, res) => {
    try {
        const {rsoid} = req.params;
        const query = `SELECT DISTINCT U.user_id FROM rsouser RU, rsos R, users U WHERE R.rso_id = RU.rso_id AND R.rso_id = ${rsoid} AND U.user_id = RU.user_id;`;
        const results = await db.query(query);
        res.status(200).json(results.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});

// Get a all rsos a user is part of
router.get('/user/:userid', async (req, res) => {
    try {
        const {userid} = req.params;
        const query = `SELECT DISTINCT R.rso_id FROM rsouser RU, rsos R, users U WHERE R.rso_id = RU.rso_id AND U.user_id = RU.user_id AND U.user_id = ${userid};`;
        const results = await db.query(query);
        res.status(200).json(results.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});

module.exports = router;
