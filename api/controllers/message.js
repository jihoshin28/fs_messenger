const Message = require('../models/message')
const Chat = require('../models/chat')

const createMessage = async(req, res) => {
    try {
        res.header('Content-Type', 'application/json')
        let data = req.body
        const newMessage = new Message({
            text: data.text,
            read: false,
            user_id: data.user_id,
            chat_id: data.chat_id
        })
        newMessage.save((err) => {
            if(err){
                throw err
            }
        })
        res.json({newMessage}).status(200)
    } catch (err) {
        res.send(err.message).status(500)
    }
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
    createMessage,
    updateChatMessage,
    deleteChatMessage
}

