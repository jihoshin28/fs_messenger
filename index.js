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
const { Server } = require('socket.io')
// const io2 = new Server(server, { cors: {origin: '*'}, path: '/user2/'})
const io = new Server(server, { cors: {origin: '*'}})
const port = 3000 | process.env.PORT


io.on('connection', (socket) => {
    console.log(`Currently ${io.engine.clientsCount} users connected`)
    console.log(socket.id, socket.handshake.query.username, 'namespace /')

    apiConnect(socket)

    //When user enters a room current Room must change
    socket.on('enter room', (data) => {
        console.log(data)
    })


    // When user joins room socket.rooms gets added to and current room changes
    socket.on('join room', (data) => {
        currentRoom = data
        socket.join(data)
        socket.to(data).emit('notification', 'I joined the room!')
        console.log(`Joined room ${data}`, socket.rooms, currentRoom)
    })

    socket.on('leave room', (data) => {
        currentRoom = undefined
        socket.leave(data)
        console.log(`Left room ${data}`, socket.rooms)
    })

    socket.on('rooms', (roomId) => {
        let rooms = socket.rooms
        const roomsObj = Array.from(rooms, v => v)
        io.to(roomId).emit('rooms', {rooms: roomsObj, roomId})
    })
    //Need 
    
    socket.on('chat message', (message) => {
        console.log('chat message', message, socket.rooms)
        let messageObj = {
            message: message.text, 
            username: socket.handshake.query.username,
            roomId: message.roomId
        }

        if(!!message.roomId){
            io.to(message.roomId).emit('chat message', messageObj)
        } else {
            return
        }
        // fs.appendFileSync(path.join(__dirname, 'chat_rooms', `${id}.txt`), `${msg},`, (err) => {
        //     if(err) throw err
        //     console.log(`appended to file with id ${id}`)
        // })

        // fs.readFile(path.join(__dirname, 'chat_rooms', `${id}.txt`), 'utf8', (err, data) => {
        //     if(err) {
        //         throw err
        //     }
        //     chatEvent(data, id)
        // })
    });

    socket.on('disconnect', () => {
        console.log('user disconnected', io.engine.clientsCount);
    });
}) 

// io2.of('/user2').on('connection', (socket) => {
//     console.log(socket.id, io.engine.clientsCount, "2")
// }) 


let apiConnect = (socket) => {
    let details = {}
    details.date = new Date()
    
    socket.emit('api connect', details)
}
server.listen(port, () => {
    console.log(`Listening on Port ${port}`)
})

