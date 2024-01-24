const { Pool } = require('pg');

const pool = new Pool({
  user: 'pedro',
  password: 'pedro2024',
  database: 'clients',
  host: 'localhost',
  port: 5432
});

module.exports = pool;