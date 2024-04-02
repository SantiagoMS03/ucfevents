const { check } = require('express-validator');
const db = require("../db");
const { compare } = require('bcryptjs')

const password = check('password').isLength({min: 3, max: 15}).withMessage('Password has to be between 3 and 15 characters.')
const email = check('email').isEmail().withMessage('Provide a valid email.')

const checkEmail = check('email').custom(async (value) => {
    const {rows} = await db.query('SELECT * from users where email = $1', [
        value,
    ])
    if (rows.length) {
        throw new Error('Email already exists.')
    }
});

const checkLogin = check('email').custom(async (value, {req}) => {
    const user = await db.query('SELECT * FROM users WHERE email = $1', [value])
    if(!user.rows.length) {
        throw new Error('Email does not exist.')
    }

    const validPass = await compare(req.body.password, user.rows[0].password);

    if(!validPass) {
        throw new Error('Wrong password')
    }

    req.user = user.rows[0]
});

module.exports = {
    registerValidation: [email, password, checkEmail],
    loginValidation: [checkLogin]
}