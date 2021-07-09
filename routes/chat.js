const chatModel = require('./db/models/chat')

var onechat = chatModel.find((data) => {
    console.log(data)
})

onechat()