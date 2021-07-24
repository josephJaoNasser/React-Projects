require('dotenv/config')
const router = require('express').Router()
const Video = require('../../models/Video')
const mongoose = require('mongoose')

//********************************************************** */
// ROUTE: GET /video/
// DESCRIPTION: get list of videos
//********************************************************* */
router.get('/', async(req, res) => {
  
  const {
    id,
    key,
    title,
    author,
    uploadedOn
  } = req.query

  try{
    const result = await Video.find({
      $and: [
        id ? { '_id' : mongoose.Types.ObjectId(id) } : {},
        author ? { 'author' : author } : {},
        key ? { 'key' : key } : {},
        title ? { 'title' : title } : {},
        uploadedOn ? { 'uploadedOn' : uploadedOn ? new Date(uploadedOn) : null } : {}
      ]
    })
 
    return res.status(200).send(result)
  }
  catch(err){
    console.error(err)
    return res.status(404).json({
      msg: 'Error occurred when fetching videos',
      error: {...err}
    })
  } 
  
})




//********************************************************** */
// ROUTE: GET /video/:key
// DESCRIPTION: get single video
//********************************************************* */
router.get('/:key', async(req, res)=> {
  const downloadParams = {
    Key: req.params.key,
    Bucket: process.env.AWS_BUCKET
  }
  
  let item;

  try{
    item = await s3.getObject(downloadParams).createReadStream()  
  }catch(err){
    console.error(err)
    return res.status(404).json({
      msg: 'Error when getting video',
      error: {...err}
    })
  }

  item.pipe(res)

})



module.exports = router