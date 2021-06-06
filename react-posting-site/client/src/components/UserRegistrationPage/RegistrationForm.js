import React, { useContext } from 'react'
import { StepperContext } from '../routes/Register'
import { Container, List, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

//components
import LoginInfoForm from './LoginInfoForm';
import BioForm from './BioForm';
import ProfileImageForm from './ProfileImageForm';
import ContactForm from './ContactForm';
import RegistrationSummary from './RegistrationSummary';

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
        {(() => {  
          switch (activeStep) {
            case 0:
              return (
                <ListItem className={classes.root}>
                  <LoginInfoForm/>        
                </ListItem>
              )
            case 1:
              return (
                <ListItem className={classes.root}>
                  <BioForm/>
                </ListItem>
              )
            case 2:
              return (
                <ListItem className={classes.root}>
                  <ProfileImageForm/>
                </ListItem>
              )
            case 3:
                return (
                  <ListItem className={classes.root}>
                    <ContactForm/>
                  </ListItem>
                )
            case 4:
                return (
                  <ListItem className={classes.root}>
                    <RegistrationSummary />
                  </ListItem>
                )
            default:
              return (
                <div>Whoops... something's not right</div>
              )
          }
        })()}
      </List>    
    </Container>
  )
}

export default RegistrationForm
