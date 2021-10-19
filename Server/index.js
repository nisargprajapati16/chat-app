const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const httpServer = createServer(app);

const io = new Server(httpServer, { 
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"]
    }
});

io.on("connection", socket => {
    console.log("Connected");

    socket.on("join_room", data => {
        console.log("Joined");
        socket.join(data)
    });

    socket.on("send_message", data => {
        console.log(data)
        socket.to(data.room).emit("receive_message", data)
    });
});

httpServer.listen(3001);