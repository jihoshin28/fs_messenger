const express = require('express')
const app = express()
const http = require ('http')
const server = http.createServer(app)
const { Server } = require ('socket.io')
const io = new Server(server)
const port = 3000 | process.env.PORT

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/templates/index.html')
})

io.on('connection', (socket) => {
    console.log('A user connected')

    socket.on('chat message', (msg) => {
        console.log('chat message', msg)
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})

server.listen(port, () => {
    console.log(`Listening on Port ${port}`)
})

