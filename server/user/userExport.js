const db = require('../db');
const { hash } = require('bcryptjs');
const {sign} = require('jsonwebtoken');
const SECRET = 'ucfevents';

exports.get = async (req, res) => {
    try {
      const results = await db.query("SELECT * FROM users");
      res.status(200).json({
        status: "success",
        results: results.rows.length,
        data: {
          users: results.rows
        }
      });
    } catch (err) {
      console.error(err);
    }
};

exports.register = async (req, res) => {
  const {university_id, access, email, password} = req.body
    try {
      const hashedPassword = await hash(password, 10)

      const results = await db.query('INSERT INTO users(university_id, access, email, password) VALUES ($1, $2, $3, $4)', [university_id, access, email, hashedPassword])

      res.status(200).json({
        status: "success",
        results: results.rows.length,
        data: {
          users: results.rows
        }
      });
    } catch (err) {
      console.error(err);
    }
};

exports.login = async (req, res) => {
  let user = req.user
  let payload = {id: user.user_id, email: user.email}

  try {
    const token = await sign(payload, SECRET)

    return res.status(200).cookie('token', token, {httpOnly: true}).json({
      status: true,
      message: "login success",
    })
  } catch (err) {
    console.error(err);
  }
}

exports.logout = async (req, res) => {
  try {
    return res.status(200).clearCookie('token', {httpOnly: true}).json({
      status: true,
      message: "logout success",
    })
  } catch (err) {
    console.error(err);
  }
}

exports.protected = async (req, res) => {
  try {
    res.status(200).json({
      info: 'protected info',
    });
  } catch (err) {
    console.error(err);
  }
};
