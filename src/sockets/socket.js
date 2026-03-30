const { Server } = require("socket.io");

let io;

const initSocket = (server) => {
    io = new Server(server, {
        cors: {
        origin: "*",
        },
    });

    io.on("connection", (socket) => {
        console.log("🔌 Client connected:", socket.id);

        // client join device room
        socket.on("join_device", (deviceId) => {
            socket.join(deviceId);
            console.log(`📥 ${socket.id} join device ${deviceId}`);
        });

        socket.on("disconnect", () => {
            console.log("❌ Client disconnected:", socket.id);
        });
    });
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO not initialized!");
  }
  return io;
};

module.exports = {
  initSocket,
  getIO,
};