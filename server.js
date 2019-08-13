const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const cors = require('cors')
const mongoose = require('mongoose')
require ('dotenv').config()
// ...
app.use(cors())
app.use(express.json())


const uri = process.env.ATLAS_URI

mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex:true})
.catch(err => console.log('Looky looky a stinky error', err))

const connection = mongoose.connection
connection.once('open', ()=>{
	console.log("MongoDB database connection established successfully")
})


const exerciseRoutes = require('./routes/excercises')
const usersRoutes = require('./routes/users')
app.use('/exercises', exerciseRoutes)

app.use('/users', usersRoutes)

app.listen(PORT, ()=>{console.log(`Full stack listening on port ${PORT}`)})

