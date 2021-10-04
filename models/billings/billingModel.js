const { Schema, model } = require('mongoose');

const schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
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
    country: {
        type: String,
        required: true
    },
    division: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    zone: {
        type: String,
        required: true
    },
    fullAddress: {
        type: String
    },
    zipCode: {
        type: String,
        required: true
    }

}, { timestamps: true })

module.exports = Billing = model('Billing', schema)