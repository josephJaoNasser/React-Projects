import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import ImageGrid from './ImageGrid'
import {  
  IconButton,  
  ListItem, 
  ListItemAvatar, 
  Avatar, 
  ListItemText,  
} from '@material-ui/core';
import { DeleteOutline } from '@material-ui/icons';

const PostItem = ({post, onDelete}) => {

  const profilImageUrl = ``

  return (    
    <ListItem alignItems="flex-start" divider>
      <ListItemAvatar>
        <Avatar alt='' src={profilImageUrl}></Avatar>
      </ListItemAvatar>
     
      <div className="post-body">  
        <ListItemText
          primary={post.user.username ?? ''}
          primaryTypographyProps={{variant:"subtitle2"}}
          secondary={
            <React.Fragment>
              <i>{moment(post.createdAt).fromNow()}</i>
            </React.Fragment>            
          }          
        />
        <ListItemText 
          primary={post.text}
        />       
         {post.media ?  
            post.media.length ? 

            <ImageGrid postid={ post._id} images={ post.media}/>
              : null           
            : null
          }
      </div>
     
    
      <IconButton
        onClick={()=>onDelete(post._id)}
        color="secondary"      
      >
        <DeleteOutline/>
      </IconButton>
      
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