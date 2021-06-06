const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')

//post model
const Post = require('../../models/Post')

// @route GET api/posts
// @desc get all posts
// @access public
router.get('/', async(req, res)=> {
  //console.log('a')
  Post.find()
    .sort({ createdAt: -1 })
    .then(posts => res.json(posts))
})

// @route POST api/posts
// @desc create a post
// @access private
router.post('/', auth, async(req, res)=> {
  User.findById(req.user.id)
    .select('-pwd -joinedOn')
    .then(user => {
      const newPost = new Post({
        text: req.body.text,
        user: user
      })

      newPost.save().then(post => res.status(201).json({post}))
    })  
})

// @route DELETE api/posts
// @desc delete a post
// @access private
router.delete('/:id',auth,async(req, res)=> {
  Post.findById(req.params.id)
    .then(post => {
      if(req.user.id != post.user._id){
        return res.status(401).json({
          msg: "You are not allowed to delete this post because you are not the author."
        })
      }
      
      post.remove().then(()=> {
        res.json({
          success:true, 
          msg:'Item successfully deleted'
        })
      })
    })
    .catch(err=>{
      res.status(404).json({
        success: false,
        msg: "Error when deleting item"
      })
    })
})


module.exports = router