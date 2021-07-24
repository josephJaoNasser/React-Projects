import axios from 'axios'
import {
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS
} from './types'

const url = '/api/comments'

export const fetchComments = (post) => dispatch => {  
  dispatch({type: FETCH_COMMENTS_REQUEST})

  axios.get(`${url}/?to=${post}`).then(res => {
    dispatch({
      type: FETCH_COMMENTS_SUCCESS,
      payload: res.data
    })
  }).catch(err=> {
    console.error(err)
  })
}

export const postComment = (comment) => (dispatch) => {
  dispatch({type: POST_COMMENT_REQUEST})
  
  axios.post(`${url}/`, comment).then(res => {
    console.log(res)
    dispatch({
      type: POST_COMMENT_SUCCESS,
      payload: res.data.comment
    })
  }).catch(err => {
    console.error(err)
  })
}
