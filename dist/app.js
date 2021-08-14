import express from 'express';
var app = express();
import http from 'http';
var server = http.createServer(app);
import { Server } from "socket.io";
var io = new Server(server);
app.get('/', function (req, res) {
    res.send('Hello, its WS server');
});
io.on('connection', function (socket) {
    console.log('a user connected');
});
server.listen(3009, function () {
    console.log('listening on *:3009');
});
