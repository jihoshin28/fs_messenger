const User = require('../api/models/user')
const connectDB = require('./index')

const deleteAllUsers = () => {
    User.deleteMany({}, (err) => {
        if(err){
            console.log(err)
        }
    })
}

deleteAllUsers()