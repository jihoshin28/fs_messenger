const User = require('../api/models/user')
const Message = require('../api/models/message')

const connectDB = require('./index')

let userDb = () => {

    let users = User.find({}, function (err, users){
        if(err) return err
        return users
    })
    return users
  
}

let messageDb = () => {
    Message.find({}, function(err, messages){
        if(err) return err
        console.log(messages)
    })
}


let users = userDb()
console.log(userDb())

// messageDb()