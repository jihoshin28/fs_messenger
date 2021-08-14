const faker = require('faker')

const Chat = require('../api/models/chat')
const Message = require('../api/models/message')
const User = require('../api/models/user')

const connectDB = require('./index')

let seedUsers = () => {
    
    for(let i = 0; i < 20; i++){
        
        let userSeed = new User({
            username: faker.name.findName(),
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            email: faker.internet.email()
        })

        userSeed.save((err) => {
            if(err){
                throw err
            }
        })  
    }
}

let seedChats = async() => {
    for(let i = 0; i < 5; i++){
        let chatSeed = new Chat({
        
        })
        chatSeed.save((err) => {
            if(err) throw(err);
            
        })
    }
}

let seedMessages = () => {
    for(let i = 0; i < 100; i++){
        console.log(faker)
    }
}

seedUsers()
seedChats()


// seedChats()
// seedMessages()
// seedUsers()