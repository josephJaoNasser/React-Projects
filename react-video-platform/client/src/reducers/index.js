import { combineReducers } from 'redux'
import videoReducer from './videoReducer'
import commentReducer from './commentReducer'

export default combineReducers({
  //place your reducers here
  videos : videoReducer,
  comments: commentReducer
})