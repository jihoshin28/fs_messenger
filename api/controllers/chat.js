const Chat = require('../models/chat')

const getAllUserChats = async(req, res) => {
    try{
        res.header('Content-Type', 'application/json')
        await Chat.find({user_id: req.user_id}).then((chats) => {
            res.json({chats}).status(200)
        })
    } catch(error){
        res.send(error.message).status(500)
    }
}

const createNewChat = (req, res) => {
    try{
        res.header('Content-Type', 'application/json')
        const newChat = new Chat({
            users: [req.body.user_ids],
            messages: []
        })
        newChat.save((err) => {
            if(err) throw err
        }) 
        res.json({newChat}).status(200)
    } catch(error){
        res.send(error.message).status(500)
    }
}

const deleteChat = () => {

}

module.exports = {
    getAllUserChats,
    createNewChat,
    deleteChat
}

