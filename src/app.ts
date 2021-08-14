import express from 'express';
const app = express();
import http from 'http';
const server = http.createServer(app);
import {Server} from "socket.io";
const io = new Server(server);
import cors from "cors"

app.use (cors());

app.get('/', (req, res) => {
    res.send('Hello, its WS server')
});

io.on('connection', (socket) => {
    console.log('a user connected');
});
io.on('message sent', (mes:string) => {
    console.log(mes)
})
const PORT = process.env.PORT || 3009
server.listen(PORT, () => {
    console.log(PORT)
    console.log('listening on *:3009');
});
