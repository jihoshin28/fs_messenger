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
        username: {type: String},
        day: [Number],
        time: [Number],
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        chat_id: {
            type: Schema.Types.ObjectId,
            ref: 'Chat'
        }
        // timestamps: true
    },
    {timestamps: true}
)

const messageModel = mongoose.model('Message', messageSchema)

module.exports = messageModel