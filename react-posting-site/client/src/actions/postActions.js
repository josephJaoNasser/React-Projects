import {FETCH_POSTS, NEW_POST, DELETE_POST, POSTS_LOADING} from './types'
import axios from 'axios'

const url = "https://simple-posts-app.herokuapp.com/api/posts/"  

export const fetchPosts = () => dispatch => { 
  dispatch(setPostsLoading());   
  axios.get(url).then(res => dispatch({
      type: FETCH_POSTS,
      posts: res.data
    })
  ).catch(err=>{
    if(err){
      console.error(err)
    }
  })     
}

export const createPost = (postData) => dispatch => {   
  dispatch({
    type: NEW_POST,
    post: postData
  })
  // axios.post(url,postData).then(res => 
  //   dispatch({
  //       type: NEW_POST,
  //       post: res.data
  //     })    
  // ).catch(err => {
  //   if(err){
  //     console.error(err)
  //   }
  // })

}

export const deletePost = (postId) => dispatch => {
  dispatch({
    type: DELETE_POST,
    id: postId
  })
}

export const setPostsLoading = () => { 
  return{
    type: POSTS_LOADING,
  }
} 