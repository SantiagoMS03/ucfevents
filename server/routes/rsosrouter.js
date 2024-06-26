const express = require("express");
const router = express.Router();
const db = require("../db");
const relateUniversityRSO = require("../middleware/relational/universityrso");


// get all rsos
router.get('/', async (req, res) => {
    try {
      const results = await db.query("SELECT * FROM rsos");
      res.status(200).json({
        status: "success",
        results: results.rows.length,
        data: {
          rsos: results.rows
        }
      });
    } catch (err) {
      console.error(err);
    }
});

// create rso
router.post('/', async (req, res) => {
    try {
        const { name, admin_id, universityid } = req.body;
        const rsoInfoQuery = "INSERT INTO rsos (name, admin_id) VALUES($1, $2) RETURNING *"
        const newrso = await db.query(rsoInfoQuery, [name, admin_id]);
        const newid = newrso.rows[0].rso_id;
        await relateUniversityRSO(universityid, newid);
        res.status(201).json({
        status: "success",
        data: {
            rso: newrso.rows[0]
        }
        });
    } catch (err) {
        console.error(err.message);
    }
});

// get rso
router.get('/:rsoid', async (req, res) => {
    try {
        const results = await db.query("SELECT * FROM rsos WHERE rso_id = $1", [req.params.rsoid]);
        res.status(200).json({
        status: "success", 
        data: {
            rso: results.rows[0]
        }
        });
    } catch (err) {
        console.log(err);
    }
});

// update rso
router.put('/:rsoid', async (req, res) => {
    try {
        console.log("here!")
        const { name, admin_id } = req.body;
        const query = "UPDATE rsos SET name = $1, admin_id = $2 WHERE rso_id = $3 RETURNING *"
        const results = await db.query(query, [name, admin_id, req.params.rsoid]);
        res.status(200).json({
        status: "success",
        data: {
            rso: results.rows[0]
        }
        });
    } catch (err) {
        console.log(err);
    }
});

// delete rso
router.delete('/:rsoid', async (req, res) => {
    try {
        const results = await db.query("DELETE FROM rsos WHERE rso_id = $1", [req.params.rsoid]);
        res.status(204).json({
        status: "success"
        });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;