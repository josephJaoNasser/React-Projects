import React, { useState } from 'react'

//material ui
import {
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
}from '@material-ui/core'
import { DeleteOutline } from '@material-ui/icons';


const ConfirmDeleteModal = ({ onConfirm }) => {
  const [open, setOpen] = useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton
        onClick={ handleClickOpen }
        color="secondary"      
        >
          <DeleteOutline/>
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
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
              handleClose()
              onConfirm()
            }} 
            color="secondary"
          >
            Delete post
          </Button>
          <Button onClick={handleClose} color="default" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmDeleteModal
