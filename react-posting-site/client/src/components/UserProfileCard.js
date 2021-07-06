import React from 'react'
import PropTypes from 'prop-types'
import {
  Avatar,
  Card,
  Container,
  Typography,
  CircularProgress,
  IconButton,
  Tooltip
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

//material ui styling
const useStyles = makeStyles(theme=> ({
  avatar:{
    width: theme.spacing(15),
    height: theme.spacing(15)
  },
  card: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    borderRadius: 20,
  },
  userInfoContainer: {    
    display: 'flex'
  },
  cardBody: {
    display: 'flex',
    flexDirection:'column',
    justifyContent:'center'
  }
}))

const UserProfileCard = ({user, loggedInUser}) => {
  const classes = useStyles()
  const profilImageUrl = user?.profile_image ? `/v1/users/${user._id}/profile-image/${user.profile_image}?size=medium` : ''
    
  return (
    <Card    
      className={classes.card}   
      elevation={3}
    >
      <Container className={classes.userInfoContainer}>
        <Avatar 
          src={profilImageUrl} 
          alt='profile image'
          className={classes.avatar}
        />
        <Container className={classes.cardBody}>
          <Typography variant='h4'>
            <strong>{user.dname ? user.dname : <CircularProgress/>}</strong>
          </Typography>
          <Typography>
            {user.uname ? `@${user.uname}`: '...'}
          </Typography>
        </Container> 
        { 
          user._id === loggedInUser?._id ?
          <Container style={{
              flexShrink:5, 
              padding: 0, 
              display: 'flex',
              flexDirection: 'column', 
              justifyContent: 'center'
            }}
          >        
            <Tooltip title='Account Settings'>
              <IconButton>
                <SettingsOutlinedIcon/>
              </IconButton>
            </Tooltip>       
          </Container>
          : ''
        }
      </Container>
    </Card>
  )
}

UserProfileCard.propTypes = {
  user: PropTypes.object.isRequired,
  loggedInUser: PropTypes.object
}

export default UserProfileCard
