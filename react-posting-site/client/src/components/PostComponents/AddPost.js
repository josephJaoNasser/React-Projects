import { useState } from 'react'
import PropTypes from 'prop-types'

//redux
import { connect } from 'react-redux'
import { createPost } from '../../actions/postActions'

//material ui
import {
  Button,
  Paper,
  InputBase,
  Snackbar
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';


const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

/*=========== 
component
=============*/
const AddPost = ({ createPost }) => {

  const [text, setText] = useState('')
  const [message, setMessage] = useState({
    msg: '',
    success: true
  })
  
  const resetMessage = () => {
    setMessage({...message, success:true})
  }

  //functions
  const sendPost = (e) => {
    e.preventDefault();    
    if(!text){
      setMessage({msg: 'Please say something!', success:false})
      return
    }

    const newPost = {
      _id: Math.random(),
      text: text,
      user: {
        _id: '1'
      }
    }
    
    createPost(newPost)
    setText('');
  }

  //html
  return (
    <form className="addForm">
      <div className="form-control">
        <Paper
          elevation={0}
          style={
            {
              backgroundColor:"#eee", 
              padding: "10px", 
              marginBottom: "1em"
            }
          }
        >
          <InputBase
            placeholder="Say something..."
            multiline
            rows={5}
            style={{width:"100%"}}
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </Paper>
        
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


export default connect(null, { createPost })(AddPost)
