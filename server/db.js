const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "chrissy21",
  host: "localhost",
  port: 5432,
  database: "ucfevents"
})

module.exports = {
  query: (text, params) => pool.query(text, params)
};