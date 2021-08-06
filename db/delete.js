const User = require('../api/models/user')
const Chat = require('../api/models/chat')
const Message = require('../api/models/message')
const connectDB = require('./index')

const deleteAllUsers = () => {
    User.deleteMany({}, (err) => {
        if(err){
            console.log(err)
        }
    })
}

const deleteAllChats = () => {
    Chat.deleteMany({}, (err) => {
        if(err){
            console.log(err)
        }
    })
}

const deleteAllMessages = () => {
    Message.deleteMany({}, (err) => {
        if(err){
            console.log(err)
        }
    })
}

deleteAllUsers()
deleteAllChats()
deleteAllMessages()