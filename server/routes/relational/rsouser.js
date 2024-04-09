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


router.post('/:rsoid/:userid', async (req, res) => {
    try {
        const {userid, rsoid} = req.params;
        const query = `INSERT INTO rsouser (rso_id, user_id) VALUES (${rsoid}, ${userid})`;
        const results = await db.query(query);
        res.status(200).json(results.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});

//Add users to rso
router.post('/:rsoid', async (req, res) => {
    try {
        const { rsoid } = req.params;
        const { user_ids } = req.body;
    
        // if (!Array.isArray(user_ids) || user_ids.length === 0) {
        //   return res.status(400).json({ error: "Invalid or empty user IDs array" });
        // }

        await Promise.all(user_ids.map(async (userid) => {
          const query = `INSERT INTO rsouser (rso_id, user_id) VALUES ($1, $2)`;
          const values = [rsoid, userid];
          await db.query(query, values);
        }));
    
        res.status(200).json({ message: "Members added to RSO successfully" });
      } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Internal server error" });
      }
});

router.delete('/:rsoid/:userid', async (req, res) => {
    try {
        const {userid, rsoid} = req.params;
        const query = `DELETE FROM rsouser * WHERE rso_id = ${rsoid} AND user_id = ${userid}`;
        const results = await db.query(query);
        res.status(200).json(results.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});

module.exports = router;