const Chat = require('../api/models/chat')
const Message = require('../api/models/message')
const User = require('../api/models/user')

const connectDB = require('./index')

const populateUsersToChat = async () => {
    const chat = await Chat.findOne({})
    const users = await User.find({})
    console.log(users)
    chat.users = users
    chat.save((err) => {
        if(err) throw err
    })
}

let populateChatsToUser = async() => {
    const user = await User.findOne({})
    const chats = await Chat.find({})
    console.log(chats)
    user.chats = chats
    user.save((err) => {
        if(err) throw err
    })
}

populateUsersToChat()
populateChatsToUser()
//test