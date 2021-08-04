const User = require('../models/user')
const connect = require('../../db')

const getUsers = async(req, res) => {
    console.log(req, res)
    try {
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        res.setHeader('Access-Control-Allow-Origin', '*')
        User.find({}).then(users => {
            res.json(users)
        })
    } catch(error){
        return res.status(500).send(error.message)
    }
}

const getUser= async(req, res) => {
    console.log(req.params.id, 'id')
    try {
        const user = await User.find({'_id': req.params.id}, function(err, user){
            if(err) {
                return err
            }
            return res.json({user}).status(200)
        })
    } catch(error){
        return res.status(500).send(error.message)
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
