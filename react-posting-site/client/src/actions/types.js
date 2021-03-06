/*********************
    POSTS MANAGEMENT
**********************/

// CRUD for Posts
export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_USER_POSTS = 'FETCH_USER_POSTS';
export const FETCH_POSTS_FAILED = 'FETCH_POSTS_FAILED';
export const NEW_POST_SENDING = 'NEW_POST_SENDING'
export const NEW_POST_SENT = 'NEW_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const DELETE_POST = 'DELETE_POST'

// reset posts
export const CLEAR_POSTS = 'CLEAR_POSTS'
export const CLEAR_USER_POSTS = 'CLEAR_USER_POSTS'

// Loading states
export const POSTS_LOADING = 'POSTS_LOADING'

// other errors / errpr management 
export const POST_ERRORS = 'POST_ERRORS'

//success message
export const SET_SUCCESS_MESSAGE = 'SET_SUCCESS_MESSAGE'
export const CLEAR_SUCCESS_MESSAGE = 'CLEAR_SUCCESS_MESSAGE'


/*********************
    USER MANAGEMENT
**********************/

// CRUD for user registration
export const REGISTER_REQUEST = 'REGISTER_REQUEST' 
export const REGISTER_FAILED = 'REGISTER_FAILED'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'

//Logging in and out 
export const LOGIN_REQUEST = 'LOGIN_REQUEST' 
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST' 
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

// Loading states
export const USERS_LOADING = 'USERS_LOADING'
export const USERS_LOADED = 'USERS_LOADED'

// other errors / error management
export const AUTH_ERROR = 'AUTH ERROR'



/*********************
    GENERAL ERROR MANAGEMENT
**********************/
export const GET_ERRORS = 'GET_ERRORS'
export const CLEAR_ERRORS = 'CLEAR_ERRORS'
