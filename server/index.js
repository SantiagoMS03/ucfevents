const express = require('express');
const app = express();
const cors = require("cors");
const db = require("./db");
const PORT = 4000;

// routes
const eventsRouter = require("./routes/eventsrouter");
const universityrouter = require("./routes/universityrouter");
const rsosRouter = require("./routes/rsosrouter");
const reviewsRouter = require("./routes/reviewsrouter");

//middleware
//app.use(morgan("dev")); // optional

//middleware
app.use(cors());
app.use(express.json());
app.set('view engine', 'html');


//routes
app.use('/events', eventsRouter);
app.use('/universities', universityrouter);
app.use('/events', reviewsRouter);
app.use('/rsos', rsosRouter);

app.get('/login', (req, res) => {
  res.send("hi!");
})

app.listen(PORT, () => {
    console.log("Server listening on port ", PORT);
})
