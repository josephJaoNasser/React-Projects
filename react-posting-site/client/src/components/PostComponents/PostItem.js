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
  Container} from '@material-ui/core';
import { DeleteOutline } from '@material-ui/icons';

const PostItem = ({post, onDelete}) => {

  const profilImageUrl = `http://simple-posts-app.herokuapp.com/api/users/${post.user._id}/profile-images/${post.user.profile_image}?size=tiny`

  return (    
    <ListItem alignItems="flex-start" divider>
      <ListItemAvatar>
        <Avatar alt='' src={profilImageUrl}></Avatar>
      </ListItemAvatar>
      {/* <h4 className="post-author">{post.user.username}</h4> */}
     
      <Container>  
        <ListItemText
          primary={post.user.username}
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
      </Container>
     
    
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