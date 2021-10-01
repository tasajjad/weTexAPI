const { Schema, model } = require('mongoose');
const date = new Date()

const schema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Others'],

    },
    password: {
        type: String,
        required: true
    },
    id: {
        type: String
    },
    date: {
        type: String,
        default: date.toLocaleDateString()
    }
}, {
    timestamps: true
})

module.exports = User = model("User", schema)