const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String
        // other options: min, max, required, enum(array, what values allowed)
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String
    },
    // friends: [Schema.Types.ObjectId],
    // timestamps: true
})

const userModel = mongoose.model("User", userSchema)

module.exports = userModel