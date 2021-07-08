import { useEffect, lazy, Suspense } from 'react'
import PropTypes from 'prop-types'
import PostItemPlaceholder from './PostItemPlaceholder';

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
import { fetchPosts, deletePost, editPost, clearUserPosts } from '../../actions/postActions'


const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

//lazy components
const PostItem = lazy(()=>import('./PostItem'))

//component
const PostList = (props) => { 
  const {  
    username,
    deletePost,
    editPost,
    error,
    fetchPosts,
    clearUserPosts,
    isLoading,
    posts,
    userPosts,
    successMessage
  } = props
  //---lifecycle functions ---
  useEffect(()=> {       
    const getPosts = async() => {
      await fetchPosts(username)
    }
    getPosts()
  },[fetchPosts, username])

  useEffect(()=> {       
    return () => {
      clearUserPosts()
    }
  },[clearUserPosts])
  

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
          (userPosts?.length && username) ?
            userPosts.map((post) => (  
              <Suspense key={post._id} fallback={<PostItemPlaceholder/>}>
                <PostItem    
                  key={post._id} 
                  post={post}  
                  onDelete={id => deletePost(id)}
                  onEdit={(id, changes)=> editPost(id, changes)}
                  onDoubleClick={()=>{}}            
                />
              </Suspense>                       
            ))
          
          :  
          (posts?.length && !username) ?
            posts.map((post) => (  
              <Suspense key={post._id} fallback={<PostItemPlaceholder/>}>
                <PostItem    
                  key={post._id} 
                  post={post}  
                  onDelete={id => deletePost(id)}
                  onEdit={(id, changes)=> editPost(id, changes)}
                  onDoubleClick={()=>{}}            
                />
              </Suspense>                       
            ))
          
          : "..."  
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
  username: PropTypes.string,
  fetchPosts: PropTypes.func.isRequired,
  deletePost: PropTypes.func,
  editPost: PropTypes.func,
  posts: PropTypes.array.isRequired,
  userPosts: PropTypes.array,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
  successMessage: PropTypes.string
}

const mapStateToProps = state => ({
  posts: state.posts.posts,
  userPosts: state.posts.userPosts,
  isLoading: state.posts.isLoading,
  error: state.posts.error,
  successMessage: state.posts.successMessage
})

export default connect(mapStateToProps, { fetchPosts, deletePost, editPost, clearUserPosts })(PostList)
