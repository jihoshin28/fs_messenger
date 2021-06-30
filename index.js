const express = require('express')
const app = express()
const routes = require('./routes')
const cors = require('cors')
app.use(routes)
app.use(cors())

const fs = require('fs')
const path = require('path')
const http = require ('http')
const server = http.createServer(app)
const { Server } = require ('socket.io')
const io = new Server(server, {path: '/chat-server/', cors: {origin: '*'}})
const port = 3000 | process.env.PORT

let messages = []

io.on('connection', (socket) => {
    io.socketsJoin('room1')
    console.log(io.engine.clientsCount)
    console.log('A user connected')
    
    socket.data.username = "allen"
    console.log(socket.rooms, socket.data)
    apiConnect(socket)
    // fs.writeFile(path.join(__dirname + '/chats' + 'newchat.txt'), (err) => {
    //     if(err) {
    //         throw err
    //     }
    //     console.log("File written")
    // })      
    
    socket.on('chat message', (msg) => {
        console.log('chat message', msg)
        messages.push(msg)
        let messageObj = {
            messages: messages, 
            id: socket.id
        }
        console.log(messages)
        io.emit('chat message', messageObj);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})

let apiConnect = (socket) => {
    let details = {}
    details.date = new Date()
    
    socket.emit('api connect', details)
}
server.listen(port, () => {
    console.log(`Listening on Port ${port}`)
})

