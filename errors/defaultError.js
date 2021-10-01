module.exports = function (err, req, res, next) {
    if (err.message) {
        res.status(500).send(err.message)
        console.log(err)
    } else {
        next()
    }
}