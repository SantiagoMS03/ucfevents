const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get('/test', (req, res) => {
    res.send("test successful!");
})

// Get a all rsos from a university
router.get('/university/:universityid', async (req, res) => {
    try {
        const {universityid} = req.params;
        const query = `SELECT DISTINCT R.rso_id FROM universityrso UR, rsos R, universities U WHERE U.university_id = ${universityid} AND U.university_id = UR.university_id AND R.rso_id = UR.rso_id;`;
        const results = await db.query(query);
        res.status(200).json(results.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});

// Get the university an rso is part of
router.get('/rso/:rsoid', async (req, res) => {
    try {
        const {rsoid} = req.params;
        const query = `SELECT DISTINCT U.university_id FROM universityrso UR, rsos R, universities U WHERE U.university_id = UR.university_id AND R.rso_id = UR.rso_id AND R.rso_id = ${rsoid};`;
        const results = await db.query(query);
        res.status(200).json(results.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});

module.exports = router;
