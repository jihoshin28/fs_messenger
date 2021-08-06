const Chat = require('../models/chat')

const getAllUserChats = async(req, res) => {
    try{
        res.header('Content-Type', 'application/json')
        let chats = await Chat.find({user_id: req.user_id})
        res.json({chats}).status(200)
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

const addUserToChat = async(req, res) => {
    try{
        res.header('Content-Type', 'application/json')
        const chat = Chat.find({_id: req.params.id})
        chat.users = [...chat.users, req.body.user_id]
        chat.save((err) => {
            if(err) throw err
        }) 
        res.json({chat}).status(200)
    } catch(error){
        res.send(error.message).status(500)
    }
}

const removeUserFromChat = async(req, res) => {
    try{
        res.header('Content-Type', 'application/json')
        const chat = Chat.find({_id: req.params.id})
        chat.users = chat.users.filter((user_id) => user_id !== req.body.user_id)
        chat.save((err) => {
            if(err) throw err
        }) 
        res.json({chat}).status(200)
    } catch(error){
        res.send(error.message).status(500)
    }
}

const deleteChat = () => {

}

module.exports = {
    getAllUserChats,
    createNewChat,
    addUserToChat,
    removeUserFromChat,
    deleteChat
}

