const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");

const PORT = process.env.PORT || 5001;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("subscribe", (userId) => {
    if (!userId || isNaN(userId)) return;
    socket.join(`user_${userId}`);
    console.log(`User ${userId} subscribed to their personal channel`);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

app.set("io", io);

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
