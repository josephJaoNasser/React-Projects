import { 
  FETCH_POSTS, 
  FETCH_POSTS_FAILED,
  NEW_POST_SENDING,
  NEW_POST_SENT,
  POST_ERRORS, 
  DELETE_POST, 
  POSTS_LOADING,
  CLEAR_ERRORS,
} from '../actions/types'

const initialState = {
  posts: [],
  isLoading: false,
  isSendingPost: false,
  error: null
}

const postReducer = (state = initialState, action) => {
  switch(action.type){

    case FETCH_POSTS:      
      return {
        ...state,
        posts: action.posts,
        isLoading: false
      };

    case FETCH_POSTS_FAILED:      
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
      
    case NEW_POST_SENDING:
      return{
        ...state,
        isSendingPost: true
      }

    case NEW_POST_SENT:
      return {
        ...state,
        isSendingPost: false,
        isLoading: false,
        posts: [action.post, ...state.posts],
        error: null
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

    case POST_ERRORS:
      return {
        ...state,
        isSendingPost: false,
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

export default postReducer