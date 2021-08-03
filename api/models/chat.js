const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chatSchema = new Schema({
    // type: {
    //     type: String,
    //     enum: ['Group', 'Private']
    //     // other options: min, max, required, enum(array, what values allowed)
    // },
        users: [Schema.Types.ObjectId],
        messages: [Schema.Types.ObjectId],
    // timestamps: true
    },
    {timestamps: true}
)

const chatModel = mongoose.model('Chat', chatSchema)

module.exports = chatModel