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

const createUser = () => {

}

const updateUser = () => {

}

const deleteUser = () => {

}


module.exports = {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser
}
