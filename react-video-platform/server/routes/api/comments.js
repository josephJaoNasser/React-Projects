require('dotenv/config')
const router = require('express').Router()
const Comment = require('../../models/Comment')
const Video = require('../../models/Video')
const mongoose = require('mongoose')


const getValidatedComment = async (req, res, next)=>{
  //check for valid query params
  if(!req.body.type){
    return res.status(400).json({
      msg: 'Please specify type of post'
    })
  }

  //check if user wrote something
  if(!req.body?.body){
    return res.status(400).json({
      msg: 'Invalid comment sent!'
    })
  }  

  //verify if video exists then make the comment and call next()
  if(req.body.type === 'video'){
    let video = await Video.findOne( {'_id': mongoose.Types.ObjectId(req.body.commentTo)} ).catch(err => {
      console.error(err)
      return res.status(404).json({
        msg: 'Error while finding video',
        error: err
      })
    })

    if(!video) {
      return res.status(404).json({
        msg: 'Video not found!'      
      })
    }
    
    next()
  }
  else if(req.query.type === 'post'){
    return res.status(400).json({
      msg: 'Feature not yet availably'
    })
  }
  else {
    return res.status(400).json({
      msg: 'Invalid comment sent!'
    })
  }
  
}

//********************************************************** */
// ROUTE: GET /comments/
// DESCRIPTION: get list of comments
//********************************************************* */
router.get('/', async(req, res) => {
  const {
    to,
    author,
  } = req.query

  try{
    const result = await Comment
      .find({'commentTo' : to})
      .sort({ postedOn: -1 })

    return res.status(200).send(result)
  }
  catch(err){
    console.error(err)
    return res.status(404).json({
      msg: 'Error occurred when fetching comments for this post',
      error: {...err}
    })
  } 
})




//********************************************************** */
// ROUTE: POST /comments/
// DESCRIPTION: post a comment
//********************************************************* */
router.post('/',getValidatedComment, async (req, res) => {  
  const comment = req.body
  let commentResult
  
  //save comment to database
  try {
    commentResult = await Comment.create(comment)
    return res.status(201).json({
      msg: 'Comment created successfully!',
      comment: commentResult
    })
  }
  catch(err){
    console.error(err)
    return res.status(404).json({
      msg: 'Failed to post a comment!',
      error: {...err}
    })
  }
})






module.exports = router