import {
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  USERS_LOADING,
  USERS_LOADED, 
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  AUTH_ERROR,
  CLEAR_ERRORS
} from '../actions/types'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: null,
  error: null
}

const authReducer = (state = initialState, action) => {
  switch(action.type){    
    case LOGIN_REQUEST:
      return{
        ...state,
        isLoading: true
      }

    case LOGOUT_SUCCESS:
      localStorage.removeItem('token')
      return{
        ...state,
        token: null,
        user: null,
        isLoading: false,
        isAuthenticated: false
      }

    case USERS_LOADING:
      return {
        ...state,
        isLoading: true
      }

    case USERS_LOADED:
      return{
        ...state,
        isAuthenticated: true,
        isLoading:false,
        user: action.payload
      } 
    
    case REGISTER_REQUEST:
      return{
        ...state,
        isLoading: true
      }

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token)
      return{
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      }   
    
    case AUTH_ERROR:
    case LOGIN_FAILED:
    case REGISTER_FAILED:
      localStorage.removeItem('token')
      return{
        ...state,
        token: null,
        user: null,
        isLoading: false,
        error: {
          ...action.error.response.data,
          status: action.error.response.status
        }
      }
    
    case CLEAR_ERRORS:
      return{
        ...state,
        error: null
      }
      
    default:
      return state;
  }
}

export default authReducer