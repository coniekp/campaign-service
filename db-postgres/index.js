// const url = process.env.DATABASE_URL || "postgres://postgres:password@localhost:5432/campaign";
// const client = new pg.Client(url);

const { Client } = require('pg')
const client = new Client ({
  user: 'postgres',
  host: 'localhost',
  database: 'campaign',
  password: 'password',
  port: 5432
})

module.exports = {
  client
};
