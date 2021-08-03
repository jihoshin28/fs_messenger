const express = require('express')
const router = express.Router()

const chatController = require('../api/controllers/chat')
const messageController = require('../api/controllers/message')
const userController = require('../api/controllers/user')

router.get('/', (req, res) => {
    res.send({ response: "Main chat page"}).status(200)
})

//users routes

router.get('/users', chatController.getUser)

//chat routes



// messages routes



module.exports = router