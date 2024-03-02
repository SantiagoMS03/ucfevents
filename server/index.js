const express = require('express');
const app = express();
<<<<<<< Updated upstream
=======
const cors = require("cors");
>>>>>>> Stashed changes
const PORT = 4000;

<<<<<<< Updated upstream
app.get('/', (req, res) => {
    res.json({ fried: 'potatoes' });
});

=======
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

>>>>>>> Stashed changes
app.listen(PORT, () => {
    console.log("Server listening on port ", PORT);
})