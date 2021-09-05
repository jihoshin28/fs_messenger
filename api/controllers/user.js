const User = require('../models/user')
const Chat = require('../models/chat')
const connect = require('../../db')
const { filter } = require('bluebird')

const getUsers = async(req, res) => {
    
    try {
        res.setHeader("Content-Type", "application/json")
        User.find({}).then(users => {
            res.json(users).status(200)
        })
    } catch(error){
        return res.send(error.message).status(500)
    }
}

const getUser= async(req, res) => {
    try {
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        User.find({'email': req.params.email}, function(err, user){
            if(err) {
                return err
            }
            return res.json({user}).status(200)
        })
    } catch(error){
        return res.send(error.message).status(500)
    }
}

const addFriend = async(req, res) => {
    await User.find({'_id': req.params.id}, function(err, user){
        if(err){
            return err
        }
        let newFriends = [...user.friends, req.body.friend]
        user.friends = newFriends
        user.save((err) => {
            if(err) throw err
        })
    })
}

const createUser = (req, res) => {
    if(!req.body.userInfo.first_name || 
        !req.body.userInfo.last_name  ||
        !req.body.userInfo.username  ||
        !req.body.userInfo.email  ||
        !req.body.userInfo.password  ||
        !req.body.userInfo.password_confirm  
    ){
        return res.json({
            success: false, 
            message: "Please fill out missing fields"
        }).status(500)
    } else {
        if(req.body.userInfo.password !== req.body.userInfo.password_confirm){
            return res.json({
                success: false,
                message: "Password confirmation does not match"
            })
        }
    }
    let userSeed = new User(req.body.userInfo)
    userSeed.save((err) => {
        if(err){
            res.send(err.message).status(500)
        }
    })
    res.send(userSeed).status(200)
}

const leaveRoom = (req, res) => {
    console.log(req.params.id, req.body)
    User.find({'_id': req.params.id}, function(err, user){
        if(err){
            return res.send(err.message).status(500)
        }
        console.log(user[0].chats)
        
        let newChats = user[0].chats.filter((chat_id) => chat_id.toString() !== req.body.chat_id)
        console.log(newChats)
        user[0].chats = newChats
        user[0].save((err) => {
            if(err) throw err
        })
    })

    Chat.find({'_id':req.body.chat_id}, function(err, chat) {
        if(err){
            return res.send(err.message).status(500)
        }
        
        if(chat[0].users.length <= 2){
            Chat.deleteOne({_id: req.body.chat_id}, function(err){
                if(err){
                    throw err
                }
            })
        } else {
            let newUsers = chat[0].users.filter((user_id) => user_id.toString() !== req.params.id)
            console.log(newUsers)
            chat[0].users = newUsers
            chat[0].save((err) => {
                if(err) throw err
            })
        }
    })
    res.send(`User successfully exited room ${req.body.chat_id}`).status(200)
}

const updateUser = async(req, res) => { 
    // used for adding friends or updating any info for user

}

const deleteUser = () => {
    
}


module.exports = {
    getUser,
    getUsers,
    addFriend,
    createUser,
    leaveRoom,
    updateUser,
    deleteUser
}
