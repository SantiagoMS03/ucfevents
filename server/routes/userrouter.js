const express = require("express");
const { validationResult } = require('express-validator');
const { get, register, login, protected, logout } = require('../user/userExport');
const { registerValidation, loginValidation } = require('../user/authorize');
const { validationMiddleware } = require('../middleware/valdMid')
const router = express.Router();
const { userAuth } = require('../middleware/authMid')
const db = require("../db");

router.get('/', get);
router.get('/protected', userAuth, protected);
router.post('/register', registerValidation, validationMiddleware, register);
router.post('/login', loginValidation, validationMiddleware, login);
router.get('/logout', userAuth, logout);

module.exports = router;