const express = require('express');
const app = express();
const cors = require("cors");
const db = require("./db");
const cookieParser = require('cookie-parser');
const passport = require('passport');
const PORT = 4000;
const URL = 'http://localhost:3000';

//middleware
require('./middleware/passMid') 

// routes
const eventsRouter = require("./routes/eventsrouter");
const universityrouter = require("./routes/universityrouter");
const rsosRouter = require("./routes/rsosrouter");
const reviewsRouter = require("./routes/reviewsrouter");
const userrouter = require("./routes/userrouter");

//middleware
//app.use(morgan("dev")); // optional

//middleware
app.use(express.json());
app.set('view engine', 'html');
app.use(cookieParser())
app.use(cors({origin: URL, credentials: true}));
app.use(passport.initialize())


//routes
app.use('/events', eventsRouter);
app.use('/universities', universityrouter);
app.use('/events', reviewsRouter);
app.use('/rsos', rsosRouter);
app.use('/users', userrouter);

app.get('/login', (req, res) => {
  res.send("hi!");
})

app.listen(PORT, () => {
    console.log("Server listening on port ", PORT);
})
