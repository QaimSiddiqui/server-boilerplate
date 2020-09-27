const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const getServer = require('./src/routes')
require('dotenv').config()

mongoose.connect(process.env.mongo_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}, err => {
    if(err)
    {
        console.log('error is ', err)
    }
    console.log('DB connected')
})
 
const app = express()

app.use(cors()) 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(express.static('uploads'))
const server = getServer(app)
server.listen(process.env.PORT || 3002, () => console.log('server listening on port 3002'))