const express = require("express");
const { validationResult } = require('express-validator');
const { get, register, login, protected, logout, getUni, getUser, updateUser } = require('../user/userExport');
const { registerValidation, loginValidation } = require('../user/authorize');
const { validationMiddleware } = require('../middleware/valdMid')
const router = express.Router();
const { userAuth } = require('../middleware/authMid')
const db = require("../db");

router.get('/', get);
router.get('/protected', userAuth, protected);
router.post('/register', registerValidation, validationMiddleware, register);
router.post('/login', loginValidation, validationMiddleware, login);
router.get('/logout', logout);
router.get('/:userid', getUni);
router.get('/:userid/data', getUser);
router.put('/:userid', updateUser)


module.exports = router;