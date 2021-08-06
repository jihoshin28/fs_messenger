const Message = require('../models/message')
const Chat = require('../models/chat')

const getChatMessages = async(req, res) => {
    await Chat.find({_id: req.params.chat_id}, (err, chat) => {
        if(err) {
            res.send(err).status(500)
        }
        const messageData = {
            chat_id: chat._id,
            chat_messages: chat.messages
        }
        res.json(messageData).status(200)
    })
}

const updateChatMessage = async(req, res) => {
    await Chat.updateOne({'_id': req.params.id}, req.body.newMesage,  (err) => {
        if(err) {
            return res.send(err).status(500)
        }
    })
    return res.send(`Updated message with id${req.params.id}`)
}   

const deleteChatMessage = async(req, res) => {
    await Chat.deleteOne({'_id': req.params.id}, (err) => {
        if(err) {
            return res.send(err).status(500)
        }
    })
    return res.send(`Deleted message with id${req.params.id}`)
    
}

module.exports = {
    getChatMessages,
    updateChatMessage,
    deleteChatMessage
}

