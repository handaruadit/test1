require("dotenv").config();
const knex = require("knex");

// const db = knex({
//   client: "pg",
//   connection: {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//   },
// });

// module.exports = db;


const db = knex({
  client: "pg",
  connection: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = db;