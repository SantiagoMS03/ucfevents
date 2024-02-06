const express = require('express');
const app = express();
const cors = require("cors");
const pool = require("./db");
const PORT = 4000;

//middleware
app.use(cors());
app.use(express.json());
app.set('view engine', 'html');

//routes

// create an event
app.post("/events", async (req, res) => {
    try {
        const { name, category, description, date, length_minutes } = req.body;
        const eventInfoQuery = "INSERT INTO events (name, category, description, date, length_minutes) VALUES($1, $2, $3, $4, $5) RETURNING *"
        const newEvent = await pool.query(eventInfoQuery, [name, category, description, date, length_minutes]);
        res.json(newEvent);
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/', (req, res) => {
    res.json({ fried: 'potatoes' });
});

app.listen(PORT, () => {
    console.log("Server listening on port ", PORT);
})