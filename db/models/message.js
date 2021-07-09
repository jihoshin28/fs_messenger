const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
    text: {
        type: String
        // other options: min, max, required, enum(array, what values allowed)
    },
    read: {
        type: Boolean
    },
    user_id: Schema.Types.ObjectId,
    chat_id: Schema.Types.ObjectId,
    // timestamps: true
})

const messageModel = mongoose.model("Messages", messageSchema)

module.exports = messageModel