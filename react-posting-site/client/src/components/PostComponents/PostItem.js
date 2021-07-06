import React, { lazy, useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import moment from 'moment'

//material ui
import {  
  Avatar,
  Divider,
  IconButton,
  Link as MaterialUiLink,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { 
  MoreHoriz, 
  ErrorOutline, 
  DeleteOutline, 
  Edit as EditIcon,
  BugReportOutlined as BugReportOutlinedIcon,
  Link as LinkIcon
} from '@material-ui/icons';


//redux store
import store from '../../store/Store'

//components
const ImageGrid = lazy(()=> import('./ImageGrid'))
const DeletePost = lazy(()=> import('./DeletePost'))
const EditPost = lazy(()=> import('./EditPost'))

//main
const PostItem = ({post, onDelete, onEdit}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  
  const profilImageUrl = post.user.profile_image ? `/v1/users/${post.user._id}/profile-image/${post.user.profile_image}?size=tiny` : ''
  
  const handleActionsOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleActionsClose = () => {
    setAnchorEl(null);
  };

  const confirmDeleteToggle = () => {
    handleActionsClose()
    setConfirmDeleteOpen(!confirmDeleteOpen)
  };

  const editFormToggle = () => {
    handleActionsClose()
    setEditOpen(!editOpen);
  };

  const onEditConfirm = (changes) => {
    setEditOpen(false)
    if(changes === post.text)
      return
    
    onEdit(post._id, changes)
  }

  return (    
    <ListItem alignItems="flex-start" divider>
      <ListItemAvatar>
        <Avatar alt='' src={profilImageUrl}></Avatar>
      </ListItemAvatar>
     
      <div className="post-contents" style={{
        display:'flex',
        flexGrow: 1,
        flexDirection: 'column'
      }}>  
        <div className="contents-head" style={{display:'flex'}}>
          <ListItemText
            primary={
              <MaterialUiLink 
                color='inherit' 
                component={Link}
                to={`/${post.user.uname}`}
                >
                {post.user.dname ??  post.user.dname}
              </MaterialUiLink>
            }
            primaryTypographyProps={{variant:"subtitle2"}}
            secondary={ `@${post.user.uname} - ${moment(post.createdAt).fromNow()}` }    
            secondaryTypographyProps={{variant:"caption"}}      
          />

          <IconButton 
            aria-controls="simple-menu" 
            aria-haspopup="true" 
            onClick={handleActionsOpen}
          >
            <MoreHoriz/>
          </IconButton>

          <EditPost 
            open={editOpen} 
            onConfirm={(changes)=> {
              onEditConfirm(changes)
            }} 
            post={post}
            onCancel={editFormToggle}
          />
          <DeletePost 
            open={confirmDeleteOpen} 
            onConfirm={()=> {
              onDelete(post._id)
              setConfirmDeleteOpen(false)
            }} 
            onCancel={confirmDeleteToggle}
          />
          {
            store.getState().auth.user ? 
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleActionsClose}            
            >
              {
                post.user._id === store.getState().auth.user?._id ?
                <List>
                  <MenuItem onClick={editFormToggle}>
                    <ListItemIcon>
                      <EditIcon/>
                    </ListItemIcon>
                    <ListItemText>
                      Edit
                    </ListItemText>                  
                  </MenuItem>
                  <MenuItem onClick={confirmDeleteToggle}>
                    <ListItemIcon>
                      <DeleteOutline color='secondary'/>                    
                    </ListItemIcon>
                    <ListItemText>
                      <Typography color='secondary'>
                        Delete
                      </Typography>
                    </ListItemText>                  
                  </MenuItem>
                </List>   
                : 
                <MenuItem>
                  <ListItemIcon>
                    <ErrorOutline/>
                  </ListItemIcon>
                  <ListItemText>
                    Report
                  </ListItemText>                
                </MenuItem>
              }
              <Divider/>
              <MenuItem>
                <ListItemIcon>
                  <BugReportOutlinedIcon/>
                </ListItemIcon>
                <ListItemText>
                  Report a bug
                </ListItemText>                
              </MenuItem>
            </Menu>  
            :
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleActionsClose}            
            >
              <MenuItem>
                <ListItemIcon>
                  <LinkIcon/>
                </ListItemIcon>
                <ListItemText>
                  Copy link to post
                </ListItemText>                
              </MenuItem>
            </Menu>
          }

        </div>
        <div className='contents-body'>
          <ListItemText 
            primary={post.text}
          />       
          {post.media?.length ?  
            <ImageGrid postid={ post._id} images={post.media}/>
            : null
          }
        </div>
      </div>  
    </ListItem>
  )
}

//Define props
PostItem.propTypes = {
  post: PropTypes.object,
  onDelete: PropTypes.func
}

export default PostItem