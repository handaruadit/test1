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