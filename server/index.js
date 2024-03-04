const express = require('express');
const app = express();
const cors = require("cors");
const PORT = 4000;

// routes
const eventsRouter = require("./routes/eventsrouter");

//middleware
app.use(morgan("dev")); // optional
app.use(cors());
app.use(express.json());
app.set('view engine', 'html');


//routes
app.use('/events', eventsRouter);

app.get('/login', (req, res) => {
  res.send("hi!");
})

app.listen(PORT, () => {
    console.log("Server listening on port ", PORT);
})