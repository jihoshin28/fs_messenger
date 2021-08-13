const express = require('express')
const router = express.Router()

const chatController = require('../api/controllers/chat')
const messageController = require('../api/controllers/message')
const userController = require('../api/controllers/user')

router.get('/', (req, res) => {
    res.send({ response: "Main chat page"}).status(200)
})

//users routes

router.get('/users', userController.getUsers)
router.get('/users/:email', userController.getUser)
router.post('/users', userController.createUser)
router.patch('users', userController.updateUser)
router.delete('users', userController.deleteUser)

//chat routes

router.get('/chats', chatController.getChats)
router.get('/chats/:id', chatController.getChat)
router.post('/chats', chatController.createChat)

// messages routes
router.post('messages', messageController.createMessage)

module.exports = router