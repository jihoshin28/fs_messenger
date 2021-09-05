const express = require('express')
const app = express()
const routes = require('./routes')
const cors = require('cors')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use(routes)

// const fs = require('fs')
// const path = require('path')

// DB imports

// const User = require('./api/models/user')
const Message = require('./api/models/message')
const Chat = require('./api/models/chat')

// Chat server imports
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, { cors: {origin: '*'}})
const port = 3000 | process.env.PORT

//API calls


io.on('connection', (socket) => {
    console.log(`Currently ${io.engine.clientsCount} users connected`)
    // On connection...
    // Sending socket details on connection
    apiConnect(socket)
    
    //When starting, user checks current rooms (need api call to check current rooms)
    checkRooms(socket)
    
    // When user signs on, user joins all pending chats(db)


    // When socket connects socket joins all rooms from chat rooms array received from api
    socket.on('on login', (data) => {
        console.log(data, 'logged in')
        let rooms = data.chat_ids
        let user_id = data.user_id
        if(!!rooms){
            rooms.forEach((chat_id) => {
                socket.join(chat_id)
            })
        }
        socket.handshake.query.user_id = user_id
        socket.to(data).emit('notification', 'I joined the room!')
        console.log(`Joined room ${data.chatIds}`, socket.rooms, user_id)
    })


    //When user creates a room socket joins room, sends other user(s) ping, and user creates pending chat
    socket.on('created room', (data) => {
        // Single or group chat creation
        let users = data.newChat.users
        for(let i = 0; i < data.newChat.users.length; i++){
            if(users[i] === socket.handshake.query.user_id){
                console.log(users[i], socket.handshake.query.user_id)
                socket.join(data.newChat._id)
            }
        }
    })

    socket.on('leave room', (data) => {
        currentRoom = undefined
        socket.leave(data)
        // need data bsae call here to remove user from chat data
        console.log(`Left room ${data}`, socket.rooms)
    })

    socket.on('rooms', () => {
        checkRooms(socket)
    })

    //Need 
    
    socket.on('chat message', async (message) => {
        
        // check to make sure roomId exists
        if(!!message.roomId){
            console.log('room id exists')
            // create the new mesage in DB
            let newMessage = new Message({
                text: message.text,
                read: false,
                username: message.username, 
                day: message.day,
                time: message.time,
                user_id: message.user_id,
                chat_id: message.roomId
            })

            let chat = await Chat.find({_id: message.roomId})
            let currentChat = chat[0]
            currentChat.messages.push(newMessage)
            currentChat.save((err) => {
                if(err){
                    throw err
                }
            })
            newMessage.save((err, message) => {
                if(err){
                    throw err
                }
                console.log('message emitted to', message.chat_id, message)
                io.to(message.chat_id.toString()).emit('chat message', message)
            })  
            // emit a socket event


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

