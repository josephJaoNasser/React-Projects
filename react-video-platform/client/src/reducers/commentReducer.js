import {
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_REQUEST,
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS
} from '../actions/types'

const initialState ={
  comments: [],
  isFetching: false
}

const commentReducer = (state = initialState, action) => {
  switch (action.type){
    case FETCH_COMMENTS_REQUEST: 
      return {
        ...state,
        isFetching: true
      }

    case FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        comments: action.payload
      }
    
    case POST_COMMENT_REQUEST:
      return {
        ...state,
        isFetching: true
      }

    case POST_COMMENT_SUCCESS:
      return {
        ...state,
        comments: [action.payload, ...state.comments],
        isFetching: false
      }

    default:
      return state
  }
}

export default commentReducer