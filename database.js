const mongoose = require('mongoose')

module.exports = function () {
    return mongoose.connect(process.env.LOCALE_DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    })
}