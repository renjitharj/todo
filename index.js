const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const port = process.env.PORT|| 3001
const userRoute = require('./routes/user.routes')
const mongoose = require('mongoose')
var jwt = require('jsonwebtoken')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/users',userRoute)
//app.use('/todos',userRoute)
mongoose.connect('mongodb+srv://tutorial:tutorial@cluster0.7itcr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(() => {
        console.log('Database connections succesful')
    }
    )
    .catch(err => {
        console.error(err)
        console.error('Database connection error')
    }
    )

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})