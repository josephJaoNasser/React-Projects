const express = require('express')
const router = express.Router()

//post model
const Post = require('../../models/Post')

// @route GET api/posts
// @desc get all posts
// @access public
router.get('/', async(req, res)=> {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
})

// @route POST api/posts
// @desc create a post
// @access public
router.post('/', async(req, res)=> {
  const newPost = new Post({
    text: req.body.text,
    user: !req.body.user ? {
      _id: 1
    }: req.body.user
  })

  newPost.save().then(post => res.status(201).json({post}))
})

// @route DELETE api/posts
// @desc delete a post
// @access public
router.delete('/:id',async(req, res)=> {
  Post.findById(req.params.id)
    .then(post => post.remove().then(()=> res.json({success:true, msg:'Item successfully deleted'})))
    .catch(err=>{
      res.status(404).json({
        success: false,
        msg: "Error when deleting item"
      })
    })
})


module.exports = router