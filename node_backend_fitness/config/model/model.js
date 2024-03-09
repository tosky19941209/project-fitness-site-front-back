const mongoose = require('mongoose');

const fitnessSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    weight: {
        type: String,
        required: false
    },
    // height: {
    //     type: String,
    //     required: false
    // }


});

const FitnessModel = mongoose.model('FitnessModel', fitnessSchema);

module.exports = FitnessModel;