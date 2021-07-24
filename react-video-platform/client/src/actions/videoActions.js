import axios from 'axios'
import {
  FETCH_VIDEOS_REQUEST,
  FETCH_VIDEOS_SUCCESS
} from './types'

const url = '/api/videos'

export const fetchVideos = (query) => dispatch => {
  dispatch({ type: FETCH_VIDEOS_REQUEST })

  axios.get(`${url}/`).then(res=> {
    dispatch({ 
      type: FETCH_VIDEOS_SUCCESS,
      payload: res.data 
    })
  }).catch(err => {
    console.error(err)
  })
}
