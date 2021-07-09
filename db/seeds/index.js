const faker = require('faker')

const chatModel = require('../models/chat')
const messageModel = require('../models/message')
const userModel = require('../models/user')

const db = require('../index')

console.log(userModel, db)
let seedUsers = () => {
    for(let i = 0; i < 20; i++){
        // let userSeed = {
        //     username: faker.name.findName,
        //     first_name: faker.name.firstName,
        //     last_name: faker.name.lastName,
        //     email: faker.internet.email
        // }
        let userSeed = new userModel({
            username: faker.name.findName,
            first_name: faker.name.firstName,
            last_name: faker.name.lastName,
            email: faker.internet.email
        })
        userSeed.save((err) => {
            if(err){
                throw err
            }
        })  
    }
}

let seedChats = () => {
    // let typeChoices = ['Group', 'Solo']
    // let chatInstance = new ChatModel({
        
    // })
}

let seedMessages = () => {
    for(let i = 0; i < 100; i++){
        console.log(faker)
    }
}



// seedChats()
// seedMessages()
// seedUsers()