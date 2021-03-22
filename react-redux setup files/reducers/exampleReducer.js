import {EXAMPLE_TYPE, NEW_POST} from '../actions/types'

const initialState = {
  posts: [],
  singlePost: {},
}

export default function(state = initialState, action){
  switch(action.type){
    case EXAMPLE_TYPE:
      // do something
      break;
    case NEW_POST:
      // do something
      break;
    default:
      return state;  
  }
}