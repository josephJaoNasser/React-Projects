import React, { useState, useContext } from 'react'
import StepperControls from './StepperControls'
import { SetUserInfoFunction } from '../routes/Register'

//material ui
import { makeStyles } from '@material-ui/core/styles';
import {  
  Card,
  CardContent,
  TextField,
  Typography,
  Container
} from '@material-ui/core';

const useStyles = makeStyles((theme)=>({
  root: {
    width: "80%",
    margin: "1em auto",
    
  },
  instructions: {
    fontWeight: 'bold',
    margin: "10px auto "
  }
}));

//component main
const BioForm = () => {
  //state
  const submitBioForm = useContext(SetUserInfoFunction)
  const [bioFormInfo, setBioFormInfo] = useState({
    displayName: '',
    bio: '',
    displayNameError: false
  })
  
  //functions
  const checkInput = () => {
    if(!bioFormInfo.displayName.length){
      setBioFormInfo({...bioFormInfo, displayNameError:true})
      return false
    }
    else{
      setBioFormInfo({...bioFormInfo, displayNameError:false})
      return true
    }
  }

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
          What should people call you?
        </Typography>
        <TextField 
          required 
          error={bioFormInfo.displayNameError}
          label="Display name"
          variant="outlined" 
          onChange={
            (e)=>setBioFormInfo({
              ...bioFormInfo, 
              displayName: e.target.value
            })
          }
        />
        <Typography 
          variant="h5"
          className={classes.instructions}
        >
          Share something about yourself!
        </Typography>  
        <Container>
          <TextField
            label="Add a bio"
            multiline
            rows={4}
            defaultValue=""
            variant="outlined"
            fullWidth  
            onChange={
              (e)=>setBioFormInfo({
                ...bioFormInfo, 
                bio: e.target.value
              })
            }          
          />          
        </Container>  
        <br/>
        <Typography
          variant="subtitle2"
          color="primary"
          
        >
          <i>Or maybe later... just click next if you want to skip</i>
        </Typography>
        <br/>
        <StepperControls 
          checkIfCanProceed={checkInput}
          onNext={()=>{
            submitBioForm((userInfo)=>({
                ...userInfo, 
                bio: bioFormInfo.bio,
                displayName: bioFormInfo.displayName
              })
            )            
          }}
        />
      </CardContent>       
      
    </Card>       
  )
}

export default BioForm