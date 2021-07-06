require('dotenv/config')
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const app = express()

app.use(express.json())

/********************************
 *         DB config
********************************/
const db = process.env.MONGO_URI

//connect to mongo
mongoose.connect(db,{ 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex:true
})
  .then(()=>console.log('Connected!'))
  .catch(err=> console.log(err))





/********************************
 *         ROUTES
********************************/
const posts = require('./routes/api/posts')
const users = require('./routes/api/users')
const auth = require('./routes/api/auth')

app.use('/v1/posts', posts)
app.use('/v1/users', users)
app.use('/v1/auth', auth)




/********************************
 *   SERVE STATIC ASSETS IN PRODUCTION
********************************/
if(process.env.NODE_ENV === 'production'){
  //set static folder
  app.use(express.static('../client/build'))
  app.get('*', (req,res)=>{
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
  })
}





/********************************
 *          PORT
********************************/
const port = process.env.PORT || 5001

app.listen(port, ()=> console.log(`Server started on port ${port}`) )