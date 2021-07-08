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


const DeletePost = ({ onConfirm, onCancel, open=false, username }) => {
  
  return (
    <div>     
      <Dialog
        open={open}
        onClose={onCancel}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Log out ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you wanna log out{ username ? `, ${username}?` : `?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            autoFocus 
            onClick={()=> {
              onConfirm()
            }} 
            color="primary"
          >
            Log out
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
  open: PropTypes.bool,
  username: PropTypes.string
}

export default DeletePost
