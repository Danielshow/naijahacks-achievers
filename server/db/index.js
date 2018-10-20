import { Pool } from 'pg';
import env from 'dotenv';

env.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.SSL_TRUE,
});

module.exports = {
  query: ((text, params, callback) => {
    pool.query(text, params, callback);
  }),
};
