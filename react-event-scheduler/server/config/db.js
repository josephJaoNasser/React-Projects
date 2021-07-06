const mongoose = require('mongoose')
//DB config
const connectToDB = async () => {
  const dbURI = process.env.MONGO_URI
  try{
    const conn = await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex:true,
      useFindAndModify: false
    })

    console.log(`Mongodb connected: ${conn.connection.host}`)

  }catch(err){
    console.error(err)
    process.exit(1)
  }
}

module.exports = connectToDB