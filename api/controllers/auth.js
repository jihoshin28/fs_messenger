const User = require('../models/user')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const login = async(req, res) => {

    await User.find({email: req.body.email}, (err, user) => {
        if(err) {
            res.json({
                success: false,
                message: "No user matches this email"
            }).status(500)
        }
        console.log(user)
        console.log(req.body.password, user[0].password)
        console.log(process.env.SECRET)
        if(req.body.password === user[0].password){
            const token = jwt.sign({
                username: req.body.username
            },
            process.env.SECRET)
            console.log(token, 'token')
            return res.json({
                success: true, 
                message: "Authorization successful!",
                user,
                token
            })
        } else {
            return res.json({
                success: false,
                message: "Passwords do not match!"
            })
        }

        
    })
}


module.exports = {
    login
}