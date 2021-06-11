import React from 'react'
import PropTypes from 'prop-types'

//material ui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
}from '@material-ui/core'


const DeletePost = ({ onConfirm, onCancel, open=false }) => {
  
  return (
    <div>     
      <Dialog
        open={open}
        onClose={onCancel}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Delete post?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The post along with its contents will be gone forever. Are you sure you want to delete this post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            autoFocus 
            onClick={()=> {
              onConfirm()
            }} 
            color="secondary"
          >
            Delete post
          </Button>
          <Button onClick={onCancel} color="default" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

DeletePost.propTypes = {
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  open: PropTypes.bool
}

export default DeletePost
