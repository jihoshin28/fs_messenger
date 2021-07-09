const express = require('express')
const chatModel = require('./db/models/chat')
const db = require('../db/index')

const router = express.Router()