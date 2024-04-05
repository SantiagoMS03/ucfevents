const express = require("express");
const router = express.Router();
const db = require("../db");

const attendingRouter = require("./relational/attending");
const eventReviewRouter = require("./relational/eventreview");
const rsoEventRouter = require("./relational/rsoevent");
const rsoUserRouter = require("./relational/rsouser");
const universityEventRouter = require("./relational/universityevent");
const universityRSORouter = require("./relational/universityrso");


router.get('/attending', attendingRouter);
router.get('/eventreview', eventReviewRouter);
router.get('/rsoevent', rsoEventRouter);
router.get('/rsouser', rsoUserRouter);
router.get('/universityevent', universityEventRouter);
router.get('/universityrso', universityRSORouter);

module.exports = router;