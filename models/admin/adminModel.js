const { Schema, model } = require('mongoose')

const schema = new Schema({
    name: {
        type: String,
        required: true,

    },
    phone: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    company: {
        name: String,
        estd: String
    },
    password: String
}, { timestamps: true })

module.exports = Admin = model('Admin', schema)