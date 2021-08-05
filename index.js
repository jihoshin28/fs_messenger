const express = require('express')
const app = express()
const routes = require('./routes')
const cors = require('cors')

app.use(cors())
app.use(routes)
const fs = require('fs')
const path = require('path')

// DB imports

const connect = require('./db/index')
// const User = require('./api/models/user')
const Message = require('./api/models/message')
// const Chat = require('./api/models/chat')

// Chat server imports
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
// const io2 = new Server(server, { cors: {origin: '*'}, path: '/user2/'})
const io = new Server(server, { cors: {origin: '*'}})
const port = 3000 | process.env.PORT

//API calls


io.on('connection', (socket) => {
    console.log(`Currently ${io.engine.clientsCount} users connected`)
    console.log(socket.id, socket.handshake.query.username, 'namespace /')

    // On connection...
    // Sending socket details on connection
    apiConnect(socket)
    
    //When starting, user checks current rooms (need api call to check current rooms)
    checkRooms(socket)
    
    // When user signs on, user joins all pending chats(db)


    // When socket connects socket joins all rooms from chat rooms array received from api
    socket.on('join rooms', (data) => {
        let rooms = data.chatIds
        let user_id = data.user_id
        console.log(rooms)
        rooms.forEach((chat_id) => {
            socket.join(chat_id)
        })
        socket.handshake.query.user_id = user_id
        socket.to(data).emit('notification', 'I joined the room!')
        console.log(`Joined room ${data.chatIds}`, socket.rooms, user_id)
    })


    //When user creates a room socket joins room, sends other user(s) ping, and user creates pending chat
    socket.on('created room', (data) => {
        // Single or group chat creation
        console.log(data)
    })



    socket.on('leave room', (data) => {
        currentRoom = undefined
        socket.leave(data)
        console.log(`Left room ${data}`, socket.rooms)
    })

    socket.on('rooms', () => {
        checkRooms(socket)
    })

    //Need 
    
    socket.on('chat message', (message) => {
        console.log('chat message', message, socket.rooms)
        let messageObj = {
            message: message.text, 
            username: socket.handshake.query.user_id,
            roomId: message.roomId
        }

        if(!!message.roomId){
            io.to(message.roomId).emit('chat message', messageObj)
            let newMessage = new Message({
                text: message.text,
                read: false,
                user_id: socket.handshake.query.user_id,
                chat_id: message.room_id
            })
            console.log(newMessage)
            newMessage.save((err) => {
                if(err){
                    throw err
                }
            })  
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
let checkRooms = (socket) => {
    let rooms = socket.rooms
    const roomsObj = Array.from(rooms, v => v)
    roomsObj.shift()
    console.log(roomsObj, 'roomsobj')
    socket.emit('rooms', {rooms: roomsObj})

}

let apiConnect = (socket) => {
    let details = {}
    details.date = new Date()
    
    socket.emit('api connect', details)
}
server.listen(port, () => {
    console.log(`Listening on Port ${port}`)
})

