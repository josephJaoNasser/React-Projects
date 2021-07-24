import {
  FETCH_VIDEOS_REQUEST,
  FETCH_VIDEOS_SUCCESS
} from '../actions/types'

const initialState = {
  videos: [],
  isFetching: false
}

const videoReducer = (state = initialState, action) => {
  switch (action.type){
    case FETCH_VIDEOS_REQUEST:
      return {
        ...state,
        isFetching: true,        
      }

    case FETCH_VIDEOS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        videos: action.payload        
      }
    
    default:
      return state
  }
}

export default videoReducer