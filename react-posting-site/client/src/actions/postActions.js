import {
  FETCH_POSTS, 
  FETCH_POSTS_FAILED,
  NEW_POST_SENDING,
  NEW_POST_SENT, 
  POST_ERRORS,
  DELETE_POST, 
  UPDATE_POST,
  POSTS_LOADING,
  SET_SUCCESS_MESSAGE,
  CLEAR_SUCCESS_MESSAGE
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
  
  dispatch({type: NEW_POST_SENDING})
  dispatch({type: POSTS_LOADING})

  let formData = new FormData()
  if(postData.media){
    postData.media.forEach(item => {
      formData.append('post-media', item)
    })
  }
  formData.append('postData', JSON.stringify(postData))
  
  const postConfig = {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...tokenConfig(getState).headers,
    }
  }
  
  axios.post(url,formData,postConfig).then(res => {
      dispatch({
        type: NEW_POST_SENT,
        post: res.data.post
      })   
      
      dispatch({
        type: SET_SUCCESS_MESSAGE,
        successMessage: 'Posted!'
      })

      setTimeout(() => dispatch({type: CLEAR_SUCCESS_MESSAGE}), 3000);
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

export const editPost = (postId, changes) => (dispatch, getState) => {  
  dispatch({type: POSTS_LOADING})

  axios.put(`${url}${postId}`,{changes},tokenConfig(getState)).then(res => {
    dispatch({
      type: UPDATE_POST,
      id: postId,
      post: res.data.post
    })

    dispatch({
      type: SET_SUCCESS_MESSAGE,
      successMessage: 'Post updated successfully'
    })

    setTimeout(() => dispatch({type: CLEAR_SUCCESS_MESSAGE}), 3000);
  })
}

export const deletePost = (postId) => (dispatch, getState) => {
  axios.delete(`${url}${postId}`,tokenConfig(getState)).then(res => {
    dispatch({
      type: DELETE_POST,
      id: postId,
      error:null
    })

    dispatch({
      type: SET_SUCCESS_MESSAGE,
      successMessage: 'Post deleted'
    })

    setTimeout(() => dispatch({type: CLEAR_SUCCESS_MESSAGE}), 3000);
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

