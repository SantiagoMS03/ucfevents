const express = require('express');
const app = express();
const cors = require("cors");
const db = require("./db");
const PORT = 4000;
const morgan = require("morgan");

//middleware
app.use(morgan("dev")); // optional
app.use(cors());
app.use(express.json());
app.set('view engine', 'html');



//routes

// get all events
app.get('/events', async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM events");
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        events: results.rows
      }
    });
  } catch (err) {
    console.error(err);
  }
});

// create event
app.post('/events', async (req, res) => {
  try {
    const { name, category, description, date, length_minutes } = req.body;
    const eventInfoQuery = "INSERT INTO events (name, category, description, date, length_minutes) VALUES($1, $2, $3, $4, $5) RETURNING *"
    const newEvent = await db.query(eventInfoQuery, [name, category, description, date, length_minutes]);
    res.status(201).json({
      status: "success",
      data: {
        event: newEvent.rows[0]
      }
    });
  } catch (err) {
    console.error(err.message);
  }
});

// get event
app.get('/events/:eventid', async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM events WHERE event_id = $1", [req.params.eventid]);
    res.status(200).json({
      status: "success",
      data: {
        event: results.rows[0]
      }
    });
  } catch (err) {
    console.log(err);
  }
})

// update event
app.put('/events/:eventid', async (req, res) => {
  try {
    console.log("here!")
    const { name, category, description, date, length_minutes } = req.body;
    const query = "UPDATE events SET name = $1, category = $2, description = $3, date = $4, length_minutes = $5 WHERE event_id = $6 RETURNING *"
    const results = await db.query(query, [name, category, description, date, length_minutes, req.params.eventid]);
    res.status(200).json({
      status: "success",
      data: {
        event: results.rows[0]
      }
    });
  } catch (err) {
    console.log(err);
  }
})

// delete event
app.delete('/events/:eventid', async (req, res) => {
  try {
    const results = await db.query("DELETE FROM events WHERE event_id = $1", [req.params.eventid]);
    res.status(204).json({
      status: "success"
    });
  } catch (err) {
    console.log(err);
  }
})


app.listen(PORT, () => {
  console.log("Server listening on port ", PORT);
})