import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { 
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@material-ui/core'

const ComentItem = () => {
  return (
    <ListItem style={{marginBottom: 10}}>
      <ListItemAvatar>
        <Avatar src="" />
      </ListItemAvatar>      
      <ListItemText
        primary={
          <Fragment>
            <div style={{
              height:40,
              width: '100%'
            }}></div>
          </Fragment>
        }
        secondary={
          <Fragment>
            <div style={{
              height:40,
              width: '100%'
            }}></div>
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
