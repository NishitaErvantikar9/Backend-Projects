const mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    postText: String
})


module.exports = mongoose.model('posts', postSchema);