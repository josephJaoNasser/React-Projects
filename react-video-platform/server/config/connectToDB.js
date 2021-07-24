const mongoose = require('mongoose')

module.exports = async function(){
  try{
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex:true
    })
    
    console.log(`Mongodb connected: ${conn.connection.host}`)
  }catch(err){
    console.error(err)
  }
}