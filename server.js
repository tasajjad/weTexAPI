const database = require('./database')
const app = require('./app')

database()
    .then(response => console.log('Database Connection Succesfull'))
    .catch(error => console.log(error.message))

app.listen(process.env.PORT, () => {
    console.log(`Server is Running PORT ${process.env.PORT}`)
})