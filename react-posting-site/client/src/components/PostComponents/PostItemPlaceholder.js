import { Fragment } from 'react'

import {  
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  LinearProgress
} from '@material-ui/core';

const PostItemPlaceholder = () => {
  return (
    <ListItem alignItems="flex-start" divider style={{minHeight: '200px'}}>
      <ListItemAvatar>
        <Avatar alt='' src=''></Avatar>
      </ListItemAvatar>
      <div className="post-contents" style={{
        display:'flex',
        flexGrow: 1,
        flexDirection: 'column'
      }}>  
        <div className='contents-body'>
          <ListItemText 
            primary={<Fragment>
              <LinearProgress/>
            </Fragment>}
          /> 
        </div>

      </div>
    </ListItem>
  )
}

export default PostItemPlaceholder
