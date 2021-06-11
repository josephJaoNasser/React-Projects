import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

//material ui
import {
  CircularProgress,
  Slide,  
  Snackbar,
  List 
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

//redux
import { connect } from 'react-redux'
import { fetchPosts, deletePost, editPost } from '../../actions/postActions'

//components
import PostItem from './PostItem'

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

//component
const PostList = (props) => { 
  const {  
    deletePost,
    editPost,
    error,
    fetchPosts,
    isLoading,
    posts,
    successMessage
  } = props
  
  //---lifecycle functions ---
  useEffect(()=> {   
    const getPosts = async() => {
      await fetchPosts()
    }
    getPosts()
  },[fetchPosts])


  // --- html ---
  return (   
    <>
      {
        isLoading &&  (<Slide
          direction='down'
          in={isLoading}
          mountOnEnter
          unmountOnExit
        >
          <CircularProgress style={{marginTop:'1em'}}/>
        </Slide> )
      }
      <List>
        { 
          posts?.length ?
            posts.map((post) => (                         
              <PostItem    
                key={post._id} 
                post={post}  
                onDelete={id => deletePost(id)}
                onEdit={(id, changes)=> editPost(id, changes)}
                onDoubleClick={()=>{}}            
              />
            ))
          
          : <i>{ "No posts to show..." }</i>
        }
      </List>   
      <Snackbar
        anchorOrigin={{ vertical:'top', horizontal:'center' }} 
        open={error}         
        autoHideDuration={3000}
      >
        <Alert severity="error">
          {error?.msg}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical:'top', horizontal:'center' }} 
        open={Boolean(successMessage?.length)} 
        autoHideDuration={3000}
      >
        <Alert severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
    </> 
  )
}

PostList.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  deletePost: PropTypes.func,
  editPost: PropTypes.func,
  posts: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
  successMessage: PropTypes.string
}

const mapStateToProps = state => ({
  posts: state.posts.posts,
  isLoading: state.posts.isLoading,
  error: state.posts.error,
  successMessage: state.posts.successMessage
})  

export default connect(mapStateToProps, { fetchPosts, deletePost, editPost })(PostList)
