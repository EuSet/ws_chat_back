import express from 'express';
const app = express();
import http from 'http';
const server = http.createServer(app);
import {Server} from "socket.io";
var cors = require('cors')
const io = new Server(server);
app.options('/', cors())
app.get('/', (req, res) => {
    res.send('Hello, its WS server')
});

io.on('connection', (socket) => {
    console.log('a user connected');
});
const PORT = process.env.PORT || 3009
server.listen(PORT, () => {
    console.log('listening on *:3009');
});
