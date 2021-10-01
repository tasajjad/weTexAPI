const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: String,
    phone: String,
    email: String,
    type: {
        type: String,
        enum: ['product', 'content']
    },
    password: String


}, { timestamps: true })

module.exports = OthersAdmin = model('OthersAdmin', schema)