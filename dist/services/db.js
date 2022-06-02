"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: 'postgres',
    host: 'localhost',
    password: '1234',
    database: 'prestago',
    port: 5000
});
module.exports = pool;
//# sourceMappingURL=db.js.map