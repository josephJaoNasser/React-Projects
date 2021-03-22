import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPosts } from '../../actions/postActions'
import PostItem from './PostItem'

const PostList = ({ newPost, posts, fetchPosts }) => { 
  //---lifecycle functions ---
  useEffect(()=> {   
    const getPosts = async() => {
      await fetchPosts()
    }
    getPosts()
  },[])
  

  useEffect(()=> {    
    if(newPost){
      const addPost = () => {
        posts.unshift(newPost)
      }
      addPost()
    }
    
  },[newPost])


  //--- functions ---
  const deletePost = (id) => {
    
  }

  // --- html ---
  return (    
    <>      
      {
        posts ?
          posts.map((post,index) => (
            <PostItem 
              key={index} 
              post={post}  
              onDelete={deletePost}
              onDoubleClick={()=>{}}            
            />
          ))
        
        : <i>{ "No posts to show..." }</i>
      }
    </>
  )
}

PostList.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  newPost: PropTypes.object
}

const mapStateToProps = state => ({
  posts: state.posts.posts,
  newPost: state.posts.singlePost
})  

export default connect(mapStateToProps, { fetchPosts })(PostList)
