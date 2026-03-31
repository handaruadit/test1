require("dotenv").config();

const http = require("http");
const app = require("./app");
const { initSocket } = require("./sockets/socket");

// init MQTT
require("./config/mqtt");

const server = http.createServer(app);

// init websocket
initSocket(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// require("dotenv").config();
// const db = require("./config/db");

// async function testDB() {
//   try {
//     const res = await db.query("SELECT NOW()");
//     console.log("Connected to DB:", res.rows[0]);
//   } catch (err) {
//     console.error("DB Error:", err.message);
//   }
// }

// testDB();