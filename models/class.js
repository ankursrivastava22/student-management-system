const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    classList: {
        type: String,
    },
    
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Class = mongoose.model('class', UserSchema)