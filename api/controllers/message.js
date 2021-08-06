const Message = require('../models/message')
const Chat = require('../models/chat')

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
    updateChatMessage,
    deleteChatMessage
}

