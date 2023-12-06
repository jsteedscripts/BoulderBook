require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const sendRoutes = require('./routes/sends')
const userRoutes = require('./routes/user')

const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to database')
        app.locals.db = mongoose.connection.db;

        // routes
        app.use('/api/sends', sendRoutes)
        app.use('/api/user', userRoutes)

        // listen to port
        app.listen(process.env.PORT, () => {
            console.log('Listening on port', process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err)
    })