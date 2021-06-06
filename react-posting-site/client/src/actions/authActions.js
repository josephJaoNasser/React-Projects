import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  USERS_LOADING,
  USERS_LOADED,
  AUTH_ERROR,
  CLEAR_ERRORS
} from './types'

import axios from 'axios'

const url = "/v1/users/"  
const authUrl = "/v1/auth/"

//authenticate
export const loadUser = () => (dispatch, getState) => {
  console.log('a')
  dispatch({
    type: USERS_LOADING
  })

  //get token from local storage
  const token = getState().auth.token

  //headers
  const config = {
    headers: {
      'Content-type' : 'application/json'
    }
  }

  //if token exists, add to headers
  if(token){
    config.headers['x-auth-token']=token
  }

  axios.get(`${authUrl}user`,config).then(res => {
    dispatch({
      type: USERS_LOADED,
      payload: res.data
    })
  }).catch( err => {
    dispatch({
      type: AUTH_ERROR,
      error: err
    })

    setTimeout(dispatch({
      type: CLEAR_ERRORS
    }),1000)
  })
  
}

export const tokenConfig = (getState) => {
  const token = getState().auth.token
  return {
    headers: {
      'x-auth-token' : token
    }
  }
}

//login
export const login = (user) => dispatch => {
  dispatch({
    type: LOGIN_REQUEST
  })

  const { username, password } = user

  //axios shit here
  axios.post(`${authUrl}login`,{username, password}).then(res => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })

    dispatch({
      type: CLEAR_ERRORS
    })
  }).catch(err => {
    dispatch({
      type: LOGIN_FAILED,
      error: err
    })
  })
}

//logout
export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT_REQUEST
  })

  dispatch({
    type: LOGOUT_SUCCESS
  })

}

//register user
export const registerUser = (newUser) => dispatch => {
  dispatch({
    type: REGISTER_REQUEST
  })  

  let formData = new FormData()
  formData.append('profile-image', newUser.profile_image[0])
  formData.append('newUserData', JSON.stringify(newUser))

  axios.post(`${url}register`,formData,{
    headers: {
      'Content-Type': 'multipart/form-data'
    }}).then(res => 
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
        error:null
      })    
  ).catch(err => {
    if(err){
      dispatch({
        type: REGISTER_FAILED,
        error: err,
      })
      
      setTimeout(dispatch({
        type: CLEAR_ERRORS
      }),1000)
    }
  })
}

