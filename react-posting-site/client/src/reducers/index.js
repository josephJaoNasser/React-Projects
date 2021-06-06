import { combineReducers } from 'redux'
import postReducer from './postReducer'
//import errorReducer from './errorReducer'
import authReducer from './authReducer'

export default combineReducers({
  posts: postReducer,
  //errors: errorReducer,
  auth: authReducer
})  