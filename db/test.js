const User = require('../api/models/user')

const connectDB = require('./index')

let testDb = () => {
    User.find({}).then(chat => {
        console.log(chat)
    })    
}
testDb()