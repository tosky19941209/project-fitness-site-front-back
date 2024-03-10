const mongoose = require('mongoose')

const logdb = new mongoose.Schema({
    userid: {
        type: Number,
        required: false 
    },
    exercisetype: {
        type: String,
        required: false    
    },
    startTime: {
        type: String,
        required: false
    },
    endTime: {
        type: String,
        required: false
    },
    counter: {
        type: String,
        required: false
    },
    accuracy: {
        type: String,
        required: false
    }
})

const fitnessexercise = mongoose.model('logexercise', logdb)
module.exports = fitnessexercise