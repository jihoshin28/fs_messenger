const User = require('../api/models/user')
const Message = require('../api/models/message')
const Chat = require('../api/models/chat')

const connectDB = require('./index')

let userDb = () => {
    User.find({}, function (err, users){
        if(err) return err
        console.log(users)
    })
}

let messageDb = () => {
    Message.find({}, function(err, messages){
        if(err) return err
        console.log(messages)
    })
}

let chatDb = () => {
    Chat.find({}, function(err, chats){
        if(err) return err
        console.log(chats)
    })
}

let populateUser = async() => {
    // const userSeed = await User.findOne({})
    // console.log(userSeed, "USER SEED")
    User.findOne({}).populate('friends').exec((err, user) => {
        if(err) throw err
        console.log(user)
    })
}

let populateChat = async() => {
    let chat = Chat.find({})
    console.log(chat)
    // Chat.find({}).populate('users').exec((err, chat) => {
    //     if(err) throw err
    //     console.log(chat[0].users)
    // })
}

// messageDb()
// userDb()
// chatDb()
// populateChat()
populateChat()