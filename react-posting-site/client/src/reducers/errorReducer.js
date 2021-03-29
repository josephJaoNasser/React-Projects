import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types'

const initialState ={
  msg: {},
  status: null,
  id: null
}

const errorReducer = (state= initialState, action) => {
  switch(action.type){
    case GET_ERRORS:
      return {
        msg: action.error.msg,
        status: action.error.status,
        id: action.error.id
      }
    case CLEAR_ERRORS:
      return {
        msg: {},
        status: null,
        id: null
      }
    default:
      return state;
  }
}

export default errorReducer