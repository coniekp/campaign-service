// const url = process.env.DATABASE_URL || "postgres://postgres:password@localhost:5432/campaign";
// const client = new pg.Client(url);

const { Pool } = require('pg')
const pool = new Pool ({
  user: 'kony',
  host: '54.183.17.226',
  database: 'campaign',
  password: 'Uiop7890',
  port: 5432
})

module.exports = {
  pool
};
