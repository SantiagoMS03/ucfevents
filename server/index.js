const express = require('express');
const app = express();
const cors = require("cors");
const db = require("./db");
const PORT = 4000;
const morgan = require("morgan");

const bodyParser = require("body-parser");

const User = require('./user');

const session = require('express-session');
const passport = require('passport');
const connectEnsureLogin = require('connect-ensure-login');


// routes
const eventsRouter = require("./routes/eventsrouter");

//middleware
app.use(morgan("dev")); // optional
app.use(cors());
app.use(express.json());
app.set('view engine', 'html');

app.use(session({
  secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//routes
app.use('/events', eventsRouter);
app.get('/dashboard', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.send(`Hello ${req.user.username}. Your session ID is ${req.sessionID} 
   and your session expires in ${req.session.cookie.maxAge} 
   milliseconds.<br><br>
   <a href="/logout">Log Out</a><br><br>
   <a href="/secret">Members Only</a>`);
});

app.get('/login', (req, res) => {
  res.send("hi!");
})


app.listen(PORT, () => {
  console.log("Server listening on port ", PORT);
})