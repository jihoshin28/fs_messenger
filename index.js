const express = require('express')
const app = express()
const routes = require('./routes')
const cors = require('cors')
app.use(routes)
app.use(cors())


const {v4: uuidv4} = require('uuid')
const fs = require('fs')
const path = require('path')
const http = require ('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, {path: '/chat-server/', cors: {origin: '*'}})
const port = 3000 | process.env.PORT
const id = uuidv4()


io.on('connection', (socket) => {
    fs.writeFile(path.join(__dirname, 'chat_rooms', `${id}.txt`), '', (err) => {
        if(err) throw err
        console.log('wrote new file', id)
    })

    io.socketsJoin(id)
    console.log(io.engine.clientsCount)
    console.log('A user connected')
    
    socket.data.username = "allen"
    console.log(socket.rooms, socket.data)
    apiConnect(socket)
    
    socket.on('chat message', async (msg) => {
        console.log('chat message', msg)
        fs.appendFileSync(path.join(__dirname, 'chat_rooms', `${id}.txt`), `${msg},`, (err) => {
            if(err) throw err
            console.log(`appended to file with id ${id}`)
        })

        fs.readFile(path.join(__dirname, 'chat_rooms', `${id}.txt`), 'utf8', (err, data) => {
            if(err) {
                throw err
            }
            chatEvent(data, id)
        })
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})

let chatEvent = (data, id) => {
    let splitData = data.split(',')
    let messages = splitData.slice(0, splitData.length - 1)

    let messageObj = {
        messages: messages, 
        id: id
    }
    io.emit('chat message', messageObj)
}

let apiConnect = (socket) => {
    let details = {}
    details.date = new Date()
    
    socket.emit('api connect', details)
}
server.listen(port, () => {
    console.log(`Listening on Port ${port}`)
})

