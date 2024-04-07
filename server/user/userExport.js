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

exports.getUser = async (req, res) => {
  try {
      const results = await db.query("SELECT * FROM users WHERE user_id = $1", [req.params.userid]);
      if (results.rows.length === 0) {
          return res.status(404).json({ status: "error", message: "User not found" });
      }
      res.status(200).json({
          status: "success",
          data: {
              users: results.rows[0]
          }
      });
  } catch (err) {
      console.error(err);
      res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

// Get a single universityid
exports.getUni = async (req, res) => {
  try {
      const results = await db.query("SELECT university_id FROM users WHERE user_id = $1", [req.params.userid]);
      if (results.rows.length === 0) {
          return res.status(404).json({ status: "error", message: "University not found" });
      }
      res.status(200).json({
          status: "success",
          data: {
              users: results.rows[0]
          }
      });
  } catch (err) {
      console.error(err);
      res.status(500).json({ status: "error", message: "Internal server error" });
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
  let payload = {id: user.user_id, email: user.email, access: user.access}

  try {
    const token = await sign(payload, SECRET)
    return res.status(200).cookie('token', token, {httpOnly: true}).json({
      data: {payload},
      status: true,
      message: "success",
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
