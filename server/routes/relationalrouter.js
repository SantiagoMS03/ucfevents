const express = require("express");
const router = express.Router();

const attendingRouter = require("./relational/attending");
const rsoEventRouter = require("./relational/rsoevent");
const rsoUserRouter = require("./relational/rsouser");
const universityEventRouter = require("./relational/universityevent");
const universityRSORouter = require("./relational/universityrso");

router.get('/test', (req, res) => {
    res.send("test successful!");
})
router.use('/attending', attendingRouter);
router.use('/rsoevent', rsoEventRouter);
router.use('/rsouser', rsoUserRouter);
router.use('/universityevent', universityEventRouter);
router.use('/universityrso', universityRSORouter);

module.exports = router;