import React, { useEffect } from 'react'
//import { TransitionGroup } from 'react-transition-group'
import PropTypes from 'prop-types'

//material ui
import {
  CircularProgress,
  Slide,
  List 
} from '@material-ui/core';

//redux
import { connect } from 'react-redux'
import { fetchPosts, deletePost } from '../../actions/postActions'
import PostItem from './PostItem'

//component
const PostList = ({  
  posts, 
  fetchPosts,
  deletePost,
  isLoading
}) => { 

  //---lifecycle functions ---
  useEffect(()=> {   
    const getPosts = async() => {
      await fetchPosts()
    }
    getPosts()
    
  },[])

  // --- html ---
  return (    
    <>
      { isLoading &&
        <Slide
          direction='down'
          in={isLoading}
          mountOnEnter
          unmountOnExit
        >
          <CircularProgress />
        </Slide> 
          
      }
      <List>
        { 
          posts ?
            posts.map((post,index) => (                         
              <PostItem    
                key={post._id} 
                post={post}  
                onDelete={id => deletePost(id)}
                onDoubleClick={()=>{}}            
              />
            ))
          
          : <i>{ "No posts to show..." }</i>
        }
      </List>    
      
    </>
  )
}

PostList.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  deletePost: PropTypes.func,
  posts: PropTypes.array.isRequired,
  isLoading: PropTypes.bool
}

const mapStateToProps = state => ({
  posts: state.posts.posts,
  isLoading: state.posts.isLoading
})  

export default connect(mapStateToProps, { fetchPosts, deletePost })(PostList)
