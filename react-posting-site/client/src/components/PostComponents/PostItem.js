import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import moment from 'moment'
import ImageGrid from './ImageGrid'
import {  
  IconButton,  
  ListItem, 
  ListItemAvatar, 
  Avatar, 
  ListItemText,
  Link as MaterialUiLink
} from '@material-ui/core';
import { DeleteOutline } from '@material-ui/icons';

//redux store
import store from '../../store/Store'
const PostItem = ({post, onDelete}) => {

  const profilImageUrl = post.user.profile_image ? `/v1/users/${post.user._id}/profile-image/${post.user.profile_image}` : ''

  return (    
    <ListItem alignItems="flex-start" divider>
      <ListItemAvatar>
        <Avatar alt='' src={profilImageUrl}></Avatar>
      </ListItemAvatar>
     
      <div className="post-body">  
        <ListItemText
          primary={
            <React.Fragment>
              <MaterialUiLink 
                color='inherit' 
                component={Link}
                to={`/${post.user.uname}`}
              >
                {post.user.dname ??  post.user.dname}
              </MaterialUiLink>
            </React.Fragment>
          }
          primaryTypographyProps={{variant:"subtitle2"}}
          secondary={
            <React.Fragment>
               { `@${post.user.uname} - ${moment(post.createdAt).fromNow()}` }        
            </React.Fragment>            
          }    
          secondaryTypographyProps={{variant:"caption"}}      
        />
        <ListItemText 
          primary={post.text}
        />       
          {post.media?.length ?  
            <ImageGrid postid={ post._id} images={ post.media}/>
            : null
          }
      </div>
     
    
      {
        post.user._id === store.getState().auth.user._id &&
        <IconButton
          onClick={()=>onDelete(post._id)}
          color="secondary"      
        >
          <DeleteOutline/>
        </IconButton>
      }
      
    </ListItem>
  )
}

//Define props
PostItem.defaultProps = {

}

PostItem.propTypes = {
  post: PropTypes.object
}

export default PostItem