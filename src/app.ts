import express from 'express';
const app = express();
import http from 'http';
const server = http.createServer(app);
import {Server} from "socket.io";
const io = new Server(server, {cors:{origin:'http://localhost:3000'}});
import cors from "cors"

app.use(cors());

const messages = [
    {message: 'Hello Dimych', id: '1', user: {id: 'a', name: 'Eugene'}},
    {message: 'Hello Eugene', id: '2', user: {id: 'b', name: 'Dimych'}}
]

app.get('/', async (req, res) => {
    res.send('Hello, its WS server')
});
const users = new Map()
io.on('connection', (socket) => {
    users.set(socket, {name: 'anonim', id: new Date().getTime().toString()})
    socket.on('client-name-sent', (name:string) => {
        const user = users.get(socket)
        user.name = name
    })

    socket.on('disconnect', () => {
        users.delete(socket)
    })
    socket.on('message-sent', (mes:string) => {
        const user = users.get(socket)
        const item =  {message: mes, id: new Date().getTime().toString(), user: {id: user.id, name: user.name}}
        messages.push(item)
        io.emit('new-message-sent', item)
    })

    socket.emit('init-messages', messages)
    console.log('a user connected');
});
io.on('message-sent', (mes:string) => {
    console.log(mes)
})
const PORT = process.env.PORT || 3009
server.listen(PORT, () => {
    console.log(PORT)
    console.log('listening on *:3009');
});
