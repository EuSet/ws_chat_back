import express from 'express';
var app = express();
import http from 'http';
var server = http.createServer(app);
import { Server } from "socket.io";
var cors = require('cors');
var io = new Server(server);
app.options('/', cors());
app.listen(3009, function () {
    console.log('CORS-enabled web server listening on port 3009');
});
app.options('*', cors());
app.get('/', cors({ origin: false }), function (req, res) {
    res.send('Hello, its WS server');
});
io.on('connection', function (socket) {
    console.log('a user connected');
});
var PORT = process.env.PORT || 3009;
server.listen(PORT, function () {
    console.log('listening on *:3009');
});
