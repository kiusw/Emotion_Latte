const { Server } = require("socket.io");

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  require("./utils/io")(io);
};

module.exports = setupSocket; 