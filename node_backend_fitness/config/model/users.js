const mongoose = require('mongoose');

const userdb = new mongoose.Schema({
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
    membership: {
        type: String,
        required: false
    },
    weight: {
        type: String,
        required: false
    },
    height: {
        type: String,
        required: false
    }
});

const fitnessuser = mongoose.model('Users', userdb);
module.exports = fitnessuser;