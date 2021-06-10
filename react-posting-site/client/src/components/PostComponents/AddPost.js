import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

//components
import { ImageAttatchmentsPreview } from '../AttatchmentsPreview'
import PostActionsComponent from './PostActionsComponent'

//context
import { useUpdateImageAttatchments } from '../AttatchmentsContext'

//redux
import { connect } from 'react-redux'
import { createPost } from '../../actions/postActions'

//material ui
import {  
  TextField,
  Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';


const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

/*=========== 
component
=============*/
const AddPost = (props) => {
  const setImageAttatchments = useUpdateImageAttatchments()
  const [text, setText] = useState('')
  const [message, setMessage] = useState({
    msg: '',
    success: true
  })

  const {  
    error,
    createPost,
    author,
    isSendingPost
  } = props
  
  useEffect(() => {
    if(error){
      setMessage({
        msg: error.msg ? error.msg : `Failed to add post (${error.status} error)`, 
        success:false
      })
    }    
  }, [error])
  
  //functions
  const resetMessage = () => {
    setMessage({...message, success:true})
  }

  const sendPost = async (attatchments) => {    
    if(!text){
      if(!(attatchments?.images?.length)){
        setMessage({msg: 'Please say something!', success:false})
        return
      }
    }
    
    const newPost = {
      text: text,
      user: author,
      media: attatchments.images
    }

    await createPost(newPost)
    
    setImageAttatchments({images: []})
    setText('');
  }

  //html
  return (
    <form className="addForm">
      <div className="form-control">
        <TextField
          placeholder="Say something..."
          multiline
          rows={5}
          style={{width:"100%", marginBottom:"10px"}}
          value={text}
          onChange={e => setText(e.target.value)}
          variant="outlined"
          disabled={isSendingPost}
          />
      </div> 
      <ImageAttatchmentsPreview/>
      <PostActionsComponent onPostSubmit={ (attatchments) => sendPost(attatchments) }/>

      <Snackbar
        anchorOrigin={{ vertical:'top', horizontal:'center' }} 
        open={!message.success} 
        onClose={resetMessage}
        autoHideDuration={6000}
      >
        <Alert onClose={resetMessage} severity="error">
          {message.msg}
        </Alert>
      </Snackbar>
    </form>
  )
}

AddPost.propTpyes = {
  createPost: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  error: state.posts.error,
  isSendingPost: state.posts.isSendingPost,
  author: state.auth.user
})


export default connect(mapStateToProps, { createPost })(AddPost)
