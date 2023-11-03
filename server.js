const express = require("express");
const http = require("http");
const app = express();
const events = require('./events/index')
const port = process.env.PORT || 3000;

const server = http.createServer(app);

const io = require('socket.io')(server, {
    cors: { origin: "*" },
    methods: ["GET", "POST"],
})

io.on("connection", (socket) => {

    socket.emit(events.USER_CONNECTED, {
        message: "user connected",
        clientId: socket.id,
    });

    // Handle the chat message event
    socket.on(events.MESSAGE_SEND, async (data) => {

        const { room, message } = data
        io.emit(`${events.MESSAGE_RECEIVED}:${room}`, message)

    });

    // Handle join stream
    socket.on('join:stream', async (schedule) => {
        io.emit(`joined:stream:${schedule}`, schedule)

    });

    // Leaving a steaming session
    socket.on('leave:stream', async (schedule) => {
        io.emit(`left:stream:${schedule}`, schedule)
    });

    // end streaming
    socket.on('end:stream', async (schedule) => {
        io.emit(`stop:live:${schedule}`, schedule)
    });

    // Handle the disconnect event
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
})

io.on("error", (error) => {
    console.log(error);
});

server.listen(port, () =>
    console.log(`Server started on http://localhost:${port}`)
);