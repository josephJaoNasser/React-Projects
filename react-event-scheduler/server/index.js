require('dotenv').config({path: './server/config/config.env'})
const path = require('path')
const passport = require('passport')
const session = require('express-session')
const express = require('express')
const cors = require('cors')


const app = express()
app.use(express.json())
app.use(cors({origin: "http://localhost:3000", credentials: true}))

/***********************************************
*                    MIDDLEWARE 
************************************************/

// === Passport JS ===
require('./config/passport')(passport)

app.use(session({
  secret: 'the secret was inside us all along',
  resave: false,
  saveUninitialized: false,
}))

app.use(passport.initialize())
app.use(passport.session())


// === MongoDB ===
const connectToDB = require('./config/db')
connectToDB()






/***********************************************
*                    ROUTES 
************************************************/
const calendar = require('./routes/api/calendar') // INOP.
const auth = require('./routes/api/auth')

app.use('/api/calendar', calendar)// INOP.
app.use('/api/auth',auth)




/***********************************************
*             SERVE STATIC ASSETS 
************************************************/
if(process.env.NODE_ENV === 'production'){
  app.use(express.static('../client/build'))
  app.get('*', (req,res)=>{
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
  })
}


/***********************************************
*                    PORT 
************************************************/
const port = process.env.PORT || 8000
app.listen(port, ()=> console.log(`Ye boii server's up at port ${port}`))

