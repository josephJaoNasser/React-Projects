import React, { useContext } from 'react'
import { StepperContext } from '../routes/Register'
import { Container, List, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

//components
import LoginInfoForm from './LoginInfoForm';
import BioForm from './BioForm';
import ProfileImageForm from './ProfileImageForm';
import ContactForm from './ContactForm';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    textAlign:'center'
  }
}));


//component
const RegistrationForm = () => {
  const { activeStep } = useContext(StepperContext)

  const classes = useStyles()

  return (
    <Container
      maxWidth="md"
    >
      <List>
        <ListItem className={classes.root}>
          <LoginInfoForm/>        
        </ListItem>
        <ListItem className={classes.root}>
          <BioForm/>
        </ListItem>
        <ListItem className={classes.root}>
          <ProfileImageForm/>
        </ListItem>
        <ListItem className={classes.root}>
          <ContactForm/>
        </ListItem>
      </List>    
    </Container>
  )
}

export default RegistrationForm
