import { useRef } from 'react'
import PropTypes from 'prop-types'

//material ui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
}from '@material-ui/core'

const EditPost = ({ onConfirm, onCancel, post, open }) => {  
  const postText = useRef(post.text)
  return (
    <div>      
      <Dialog
        fullWidth
        open={open}
        onClose={onCancel}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Edit Post"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            defaultValue={postText.current}
            onChange={(e) => {
              postText.current = e.target.value
            }}
            variant="outlined"
            />
            {
              post.media?.length ?
                <DialogContentText variant='body2'>
                  <br/>
                  <i>
                    Note: You can only change the caption. 
                    If you want to edit the media, you have to delete this post
                    and then repost with the changes to your media
                  </i>
                </DialogContentText>
              : ''
            }
        </DialogContent>
        <DialogActions>
          <Button 
            autoFocus 
            onClick={()=> {
              onConfirm(postText.current)
            }} 
            color="primary"
            variant="outlined"
          >
            Save changes
          </Button>
          <Button 
            onClick={()=>{
              onCancel()
              postText.current = post.text
            }} 
            color="default" 
            autoFocus
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

EditPost.propTypes = {
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  open: PropTypes.bool,
  post: PropTypes.object.isRequired
}

export default EditPost
