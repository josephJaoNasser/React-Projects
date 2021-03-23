const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

//body parser
app.use(bodyParser.json())

//DB config
const db = require('./config/keys').mongoURI

//connect to mongo
mongoose.connect(db)
  .then(()=>console.log('Connected!'))
  .catch(err=> console.log(err))


//define and use routes
const posts = require('./routes/api/posts')

app.use('/api/posts', posts)

//define port
const port = process.env.PORT || 6969

app.listen(port, ()=> console.log(`Server started on port ${port}`) )