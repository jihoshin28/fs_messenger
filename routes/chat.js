const express = require('express')
const chatModel = require('./db/models/chat')
const db = require('../db')

const router = express.Router()

// get all messages for a user
router.route('/user').get((req, res, next) => {
    
})