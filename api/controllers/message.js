const Message = require('../models/message')
const Chat = require('../models/chat')

const getChatMessagesForChat = async(req, res) => {
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

const updateChatMessage = () => {

}

const deleteChatMessage = () => {

}

module.exports = {
    getChatMessages,
    updateChatMessage,
    deleteChatMessage
}

