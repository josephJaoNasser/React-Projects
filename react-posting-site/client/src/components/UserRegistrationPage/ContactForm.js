import React, { useState, useContext } from 'react'
import { SetUserInfoFunction } from '../routes/Register'
import StepperControls from './StepperControls'

//material ui
import { makeStyles } from '@material-ui/core/styles';
import {  
  Card,
  CardContent,
  TextField,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme)=>({
  root: {
    width: "80%",
    margin: "1em auto",
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
    
  },
  instructions: {
    fontWeight: 'bold',
    margin: "10px auto "
  }
}));

//component main
const ContactForm = () => {
  const submitContactInfo = useContext(SetUserInfoFunction)    

  const classes = useStyles()
  return (
    <Card 
      className={classes.root}
      elevation={3}
    >
      <CardContent>
        <Typography 
          variant="h5"
          className={classes.instructions}
        >
          How can we contact you?
        </Typography>   
        
        <TextField 
          required 
          variant="outlined" 
          label="E-mail"
          type="email"
        />
        <StepperControls
          onNext={()=>{

          }}
        />
      </CardContent>        
    </Card>       
  )
}

export default ContactForm
