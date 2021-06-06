import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

//redux
import { connect } from 'react-redux'
import { createPost } from '../../actions/postActions'

//material ui
import {
  Button,
  TextField,
  Snackbar
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';


const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

/*=========== 
component
=============*/
const AddPost = (props) => {

  const [text, setText] = useState('')
  const [message, setMessage] = useState({
    msg: '',
    success: true
  })

  const {  
    error,
    createPost,
    author
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

  const sendPost = (e) => {
    e.preventDefault();    
    if(!text){
      setMessage({msg: 'Please say something!', success:false})
      return
    }

    const newPost = {
      _id: Math.random(),
      text: text,
      user: author
    }
    
    createPost(newPost)
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
        style={{width:"100%", marginBottom:"1.5em"}}
        value={text}
        onChange={e => setText(e.target.value)}
        variant="outlined"
      />
        
      </div> 
      <Button
        variant="contained"
        color="primary"
        onClick={sendPost}
      >
        Post
      </Button>
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
  author: state.auth.user
})


export default connect(mapStateToProps, { createPost })(AddPost)
