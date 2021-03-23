import { FETCH_POSTS, NEW_POST, DELETE_POST, POSTS_LOADING} from '../actions/types'

const initialState = {
  posts: [],
  isLoading: false
}

const postReducer = (state = initialState, action) => {
  switch(action.type){
    case FETCH_POSTS:      
      return {
        ...state,
        posts: action.posts,
        isLoading: false
      };
    case NEW_POST:
      return {
        ...state,
        posts: [action.post, ...state.posts]
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.id)
      };
    case POSTS_LOADING:
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;  
  }
}

export default postReducer