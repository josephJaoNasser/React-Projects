import {
  FETCH_POSTS, 
  FETCH_POSTS_FAILED,
  NEW_POST, 
  POST_ERRORS,
  DELETE_POST, 
  POSTS_LOADING
} from './types'
import axios from 'axios'
import { tokenConfig } from '../actions/authActions'

const url = "/v1/posts/"  

export const fetchPosts = () => dispatch => { 
  dispatch(setPostsLoading());
     
  axios.get(url).then(res => dispatch({
      type: FETCH_POSTS,
      posts: res.data
    })
  ).catch(err=>{
    if(err){
      dispatch({
        type: FETCH_POSTS_FAILED,
        error: err
      }) 
    }
  })     
}

export const createPost = (postData) => (dispatch, getState) => {
     
  axios.post(url,postData,tokenConfig(getState)).then(res => {
      dispatch({
        type: NEW_POST,
        post: res.data.post
      })    
    }
  ).catch(err => {
    if(err){
      dispatch({
        type: POST_ERRORS,
        error: err,
      }) 
    }
  })
}

export const deletePost = (postId) => (dispatch, getState) => {
  axios.delete(`${url}${postId}`,tokenConfig(getState)).then(res => {
    dispatch({
      type: DELETE_POST,
      id: postId,
      error:null
    })
  }
  ).catch(err=>{
    if(err){
      dispatch({
        type: POST_ERRORS,
        error: err,
      }) 
    }
  })     
}

export const setPostsLoading = () => { 
  return{
    type: POSTS_LOADING,
  }
} 

