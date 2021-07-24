import { useState } from 'react'
import { connect } from 'react-redux'
import { postComment } from '../../actions/commentActions'
import{
  Avatar,
  TextField,
  Button
} from '@material-ui/core'

export const PostComment = ({ post, postComment }) => {

  const [comment, setComment] = useState('')

  const handleUserInput = (e) => {
    setComment(e.target.value)
  }

  const handleCancel = () => {
    setComment('')
  }

  const handleSend = async () => {
    const newComment = {
      body: comment,
      commentTo: post,
      type: 'video'
    }

    await postComment(newComment)

    setComment('')
  }

  return (
    <>
      <div style={{
        display: 'flex',
        gap: 10
      }}>
        <Avatar />
        <TextField
          label="Leave a comment..."
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          style={{marginBottom:10}}      
          onChange={ handleUserInput }  
        />      
      </div>
      <div style={{
        display:'flex',
        gap:10,
        justifyContent:'flex-end'
      }}>
        <Button variant='text' onClick={ handleCancel }> 
          Cancel
        </Button> 
        <Button 
          color='primary' 
          variant='contained' 
          elevation={0}
          onClick = { handleSend }
          style={{
            color:'white'
          }}        
        > 
          Post Comment
        </Button>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  
})
 

export default connect(mapStateToProps, { postComment })(PostComment)
