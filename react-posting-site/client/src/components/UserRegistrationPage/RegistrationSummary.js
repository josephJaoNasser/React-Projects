import React, { useContext } from 'react'
import { 
  Container, 
  List, 
  ListItem, 
  TextField, 
  Avatar 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { UserInfoState } from '../routes/Register'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: "0 auto"
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
}));


 const RegistrationSummary = () => {
  
  const { userInfo } = useContext(UserInfoState)
  const classes = useStyles();
  return (
    <Container maxWidth='sm'>     
      <h1>Summary</h1>
      <div className={classes.root}>
        <Avatar src={userInfo.profile_image_url} className={classes.large} />
      </div>
      
      <List>
        <ListItem>
          <TextField
            fullWidth 
            label="Username"
            defaultValue={userInfo.username}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
            
        </ListItem>
        <ListItem>
          <TextField
            fullWidth 
            label="Display Name"
            defaultValue={userInfo.displayName}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
        </ListItem>
        <ListItem>
          <TextField
            fullWidth 
            label="E-mail"
            defaultValue={userInfo.email}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
        </ListItem>
      </List>
    </Container>
  )
}

export default RegistrationSummary