import {FETCH_POSTS, NEW_POST} from '../actions/types'

const initialState = {
  posts: [],
  singlePost: {}
}

const postReducer = (state = initialState, action) => {
  switch(action.type){
    case FETCH_POSTS:      
      return {
        ...state,
        posts: action.posts
      };
    case NEW_POST:
      return {
        ...state,
        singlePost: action.post
      };
    default:
      return state;  
  }
}

export default postReducer