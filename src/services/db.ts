import { Pool } from "pg";

const pool = new Pool({
 user:process.env.USER,
 host:process.env.HOST,
 password:process.env.PASSWORD,
 database:process.env.DB_POSG,
 port:5432
});

module.exports = pool;