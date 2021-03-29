import React, { useState, useContext } from 'react'
import { SetUserInfoFunction } from '../routes/Register'
import StepperControls from './StepperControls'

//material ui
import { makeStyles } from '@material-ui/core/styles';
import {  
  Card,
  CardContent,
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
const ProfileImageForm = () => {
  const submitProfileImage = useContext(SetUserInfoFunction)  

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
          What do you look like?
        </Typography>    
        <StepperControls />
      </CardContent>        
    </Card>       
  )
}

export default ProfileImageForm
