const express = require("express");
const router = express.Router();
const db = require("../db/db");


// Create a university
router.post('/api/v1/universities', async (req, res) => {
    try {
        const { name, location, description } = req.body;
        const query = "INSERT INTO universities (name, location, description) VALUES ($1, $2, $3) RETURNING *";
        const newUniversity = await db.query(query, [name, location, description]);
        res.status(201).json({
            status: "success",
            data: {
                university: newUniversity.rows[0]
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});

// Get all universities
router.get('/api/v1/universities', async (req, res) => {
    try {
        const results = await db.query("SELECT * FROM universities");
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                universities: results.rows
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});


// Get a single university
router.get('/api/v1/universities/:universityId', async (req, res) => {
    try {
        const results = await db.query("SELECT * FROM universities WHERE id = $1", [req.params.universityId]);
        if (results.rows.length === 0) {
            return res.status(404).json({ status: "error", message: "University not found" });
        }
        res.status(200).json({
            status: "success",
            data: {
                university: results.rows[0]
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});

// Update a university
router.put('/api/v1/universities/:universityId', async (req, res) => {
    try {
        const { name, location, description } = req.body;
        const query = "UPDATE universities SET name = $1, location = $2, description = $3 WHERE university_id = $4 RETURNING *";
        const results = await db.query(query, [name, location, description, req.params.universityId]);
        if (results.rows.length === 0) {
            return res.status(404).json({ status: "error", message: "University not found" });
        }
        res.status(200).json({
            status: "success",
            data: {
                university: results.rows[0]
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});

// Delete a university
router.delete('/api/v1/universities/:universityId', async (req, res) => {
    try {
        const results = await db.query("DELETE FROM universities WHERE university_id = $1", [req.params.universityId]);
        if (results.rowCount === 0) {
            return res.status(404).json({ status: "error", message: "University not found" });
        }
        res.status(204).json({
            status: "success"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});

module.exports = router;
