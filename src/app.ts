import express from 'express';
const app = express();
import http from 'http';
const server = http.createServer(app);
import {Server} from "socket.io";
const io = new Server(server);

app.get('/', (req, res) => {
    res.send('Hello, its WS server')
});

io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(3009, () => {
    console.log('listening on *:3009');
});