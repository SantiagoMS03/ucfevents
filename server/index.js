const express = require('express');
const app = express();
const cors = require("cors");
const db = require("./db");
const PORT = 4000;

// routes
const eventsRouter = require("./routes/eventsrouter");
const universityrouter = require("./routes/universityrouter");

//middleware
//app.use(morgan("dev")); // optional
const reviewsRouter = require("./routes/reviewsrouter");

//middleware
app.use(cors());
app.use(express.json());
app.set('view engine', 'html');


//routes
app.use('/events', eventsRouter);
app.use('/universities', universityrouter);
app.use('/reviews', reviewsRouter);


app.get('/login', (req, res) => {
  res.send("hi!");
})

app.listen(PORT, () => {
    console.log("Server listening on port ", PORT);
})
