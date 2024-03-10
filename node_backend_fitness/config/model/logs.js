const mongoose = require('mongoose')

const logdb = new mongoose.SchemaType({
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
        type: Number,
        required: false
    },
    accuracy: {

    }
})

const fitnessexercise = mongoose.model('logexercise', logdb)
module.exports = fitnessexercise