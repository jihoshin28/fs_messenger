const User = require('../models/user')
const connect = require('../../db')

const getUsers = async(req, res) => {
    console.log(req, res)
    try {
        res.setHeader("Content-Type", "application/json")
        User.find({}).then(users => {
            res.json(users).status(200)
        })
    } catch(error){
        return res.send(error.message).status(500)
    }
}

const getUser= async(req, res) => {
    console.log(req.params.id, 'id')
    try {
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        User.find({'email': req.params.email}, function(err, user){
            if(err) {
                return err
            }
            return res.json({user}).status(200)
        })
    } catch(error){
        return res.send(error.message).status(500)
    }
}

const addFriend = async(req, res) => {
    await User.find({'_id': req.params.id}, function(err, user){
        if(err){
            return err
        }
        let newFriends = [...user.friends, req.body.friend]
        user.friends = newFriends
        user.save((err) => {
            if(err) throw err
        })
    })
}

const createUser = (req, res) => {
    let userSeed = new User(req.body.newUser)
    userSeed.save((err) => {
        if(err){
            res.send(err.message).status(500)
        }
    })
    res.send(`User ${userSeed._id} created`)
}

const updateUser = async(req, res) => { 
    // used for adding friends or updating any info for user

}

const deleteUser = () => {
    
}


module.exports = {
    getUser,
    getUsers,
    addFriend,
    createUser,
    updateUser,
    deleteUser
}
