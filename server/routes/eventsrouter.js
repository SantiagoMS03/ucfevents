const express = require("express");
const router = express.Router();
const db = require("../db");

const relateRSOEvent = require("../middleware/relational/rsoevent");

router.get('/', async (req, res) => {
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
router.post('/', async (req, res) => {
try {
    const { name, category, description, date, length_minutes, rso_id, visibility } = req.body;
    const eventInfoQuery = "INSERT INTO events (name, category, description, date, length_minutes, rso_id, visibility) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *"
    const newEvent = await db.query(eventInfoQuery, [name, category, description, date, length_minutes, rso_id, visibility]);
    const newid = newEvent.rows[0].event_id;
    await relateRSOEvent(rso_id, newid);
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
router.get('/:eventid', async (req, res) => {
try {
    const event = await db.query("SELECT * FROM events WHERE event_id = $1", [req.params.eventid]);

    const reviews = await db.query("SELECT * FROM reviews WHERE event_id = $1", [req.params.eventid]);  //updated for reviews
    
    res.status(200).json({
    status: "success", 
    data: {
        event: event.rows[0],
        reviews: reviews.rows,  //updated for reivews
    }
    });
} catch (err) {
    console.log(err);
}
})

// update event
router.put('/:eventid', async (req, res) => {
try {
    console.log("here!")
    const { name, category, description, date, length_minutes, rso_id, visibility } = req.body;
    const query = "UPDATE events SET name = $1, category = $2, description = $3, date = $4, length_minutes = $5, , rso_id = $6, visibility = $7 WHERE event_id = $8 RETURNING *"
    const results = await db.query(query, [name, category, description, date, length_minutes, rso_id, visibility, req.params.eventid]);
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
router.delete('/:eventid', async (req, res) => {
try {
    const results = await db.query("DELETE FROM events WHERE event_id = $1", [req.params.eventid]);
    res.status(204).json({
    status: "success"
    });
} catch (err) {
    console.log(err);
}
})
  
// router.get('/', (req, res) => {
//     res.send("list!");
// })

// router.post('/', (req, res) => {
//     res.send("posting event!");
// })

// router.get('/:eventid', (req, res) => {
//     res.send(`view event number ${req.params.eventid}`);
// })

// router.put('/:eventid', (req, res) => {
//     res.send(`edit event number ${req.params.eventid}`);
// })

// router.post('/:eventid', (req, res) => {
//     res.send(`comment on event ${req.params.eventid}`);
// })

// router.delete('/:eventid', (req, res) => {
//     res.send(`delete event number ${req.params.eventid}`);
// })

module.exports = router;
