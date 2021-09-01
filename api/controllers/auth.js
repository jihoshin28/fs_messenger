const User = require('../models/user')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const login = async(req, res) => {

    await User.find({email: req.body.email}, (err, user) => {
    
        if(!req.body.password){
            return res.json({
                success: false, 
                message: "Please enter a password"
            }).status(500)
        } else {
            
            if(user.length < 1) {
                return res.json({
                    success: false,
                    message: "No user matches this email"
                }).status(500)
            } else {
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
                        message: "Password is incorrect!"
                    })
                }
            }
    

        }
      

        
    })
}


module.exports = {
    login
}