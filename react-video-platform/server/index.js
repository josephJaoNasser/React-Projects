const dotenv = require('dotenv')
const passport = require('passport')
const path = require('path')
const express = require('express')
const cors = require('cors')
const session = require('express-session')
const fs = require('fs')
const util = require('util')

const app = express()

/*****************************************************
 *                 MIDDLEWARE
 *****************************************************/
if(process.env.NODE_ENV !== 'production'){
  dotenv.config({path: './server/config/config.env'})
}

app.use(cors())
app.use(express.json())


// === Connect to MongoDB === //
const connectToDB = require('./config/connectToDB')
connectToDB()



// === Passport JS === //
require('./config/passport')(passport)
app.use(session({
  secret: 'the secret was inside us all along',
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())





/*****************************************************
 *                   ROUTES
 *****************************************************/
const auth = require('./routes/api/auth')
const upload = require('./routes/api/upload')
const videos = require('./routes/api/videos')
const comments = require('./routes/api/comments')

app.use('/api/auth', auth)
app.use('/api/upload', upload)
app.use('/api/videos', videos)
app.use('/api/comments', comments)



/*****************************************************
 *          SERVE STATIC ASSETS IN PRODUCTION
 *****************************************************/
if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))
  app.get('*',(req, res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}





/*****************************************************
 *                 PORT
 *****************************************************/
const port = process.env.PORT || 3001
app.listen(port, ()=> {
  console.log(`YOYOYO server is up at port ${port}`)
})