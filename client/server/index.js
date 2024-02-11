const express = require('express');
const app = express();
const cors = require("cors");
const pool = require("./db");
const PORT = 4000;
const morgan = require("morgan");

//middleware
app.use(morgan("dev")); // optional
app.use(cors());
app.use(express.json());
app.set('view engine', 'html');

//routes

// get all events
app.get('/events', (req, res) => {
  res.status(200).json({ fried: 'potatoes' });
});

// create event
app.post('/events', async (req, res) => {
  try {
    const { name, category, description, date, length_minutes } = req.body;
    const eventInfoQuery = "INSERT INTO events (name, category, description, date, length_minutes) VALUES($1, $2, $3, $4, $5) RETURNING *"
    const newEvent = await pool.query(eventInfoQuery, [name, category, description, date, length_minutes]);
    res.json(newEvent);
  } catch (err) {
    console.error(err.message);
  }
});

// get event
app.get('/events/:eventid', (req, res) => {
  console.log(req.params.eventid);
})

// update event
app.put('events/:eventid', (req, res) => {
  console.log(req.params.eventid);
})

// delete event
app.delete('/events/:eventid', (req, res) => {
  console.log(req.params.eventid);
})


app.listen(PORT, () => {
  console.log("Server listening on port ", PORT);
})