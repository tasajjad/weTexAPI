const express = require('express')
const app = express()
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')
dotenv.config()
const corsConfig = {
    origin: '*',
    method: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeader: ['x-auth-token']
}
app.use(cors(corsConfig))
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// Interl Import
const defaultError = require('./errors/defaultError')
const notFound = require('./errors/notFound')

const adminRouter = require('./routers/adminRouter')
const userRouter = require('./routers/userRouter');
const ohtersAdmin = require('./routers/othersAdminRouter')
const billing = require('./routers/billingRouter')
const category = require('./routers/categoryRouter')


app.use('/api', adminRouter)
app.use('/api', userRouter)
app.use('/api', ohtersAdmin)
app.use('/api', billing)
app.use('/api', category)



app.use(defaultError)
app.use(notFound)
module.exports = app;
