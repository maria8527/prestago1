import { Pool } from "pg";

const pool = new Pool({
 user:'postgres',
 host:'localhost',
 password:'1234',
 database:'prestago',
 port:5000
});

module.exports = pool;