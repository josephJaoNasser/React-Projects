import {
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  USERS_LOADING,
  USERS_LOADED,
  AUTH_ERROR
} from '../actions/types'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: null,
}

const authReducer = (state = initialState, action) => {
  switch(action.type){
    case REGISTER_FAILED:
      return

    case REGISTER_REQUEST:
      return

    case REGISTER_SUCCESS:
      return

    case LOGIN_FAILED:
      return

    case LOGIN_REQUEST:
      return

    case LOGIN_SUCCESS:
      return{
        ...state,
        isAuthenticated: true,
        isLoading:false,
        user: action.user
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

    case AUTH_ERROR:
      return
      
    default:
      return state;
  }
}

export default authReducer