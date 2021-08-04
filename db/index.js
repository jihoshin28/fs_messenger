const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const mongoDB = 'mongodb://127.0.0.1/fs_messenger_database'

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db