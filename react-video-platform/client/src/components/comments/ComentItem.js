import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { 
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@material-ui/core'

const ComentItem = ({comment}) => {
  return (
    <ListItem style={{marginBottom: 10}}>
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src="" />
      </ListItemAvatar>      
      <ListItemText
        primary={comment.author?.name }
        secondary={
          <Fragment>
            <Typography
              component='span'
              variant='body1'
              gutterBottom
            >
              {comment.body}
            </Typography>
          </Fragment>
        }
      />        
    </ListItem>
  )
}

ComentItem.propTypes = {
  comment: PropTypes.object
}

export default ComentItem
