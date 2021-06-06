import React, { useState, useContext } from 'react'
import { UserInfoState } from '../routes/Register'
import StepperControls from './StepperControls'
import axios from 'axios'

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
  const { userInfo, setUserInfo} = useContext(UserInfoState)    
  const [contactInfo, setContactInfo] = useState({
    email: userInfo.email,
    emailHasError: false,
    emailHelperText:''
  })

  const checkInput = async () => {
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;   
    if(!emailRegex.test(contactInfo.email)){
      setContactInfo((state) =>( {
        ...state,
        emailHasError: true,
        emailHelperText:'E-mail entered is invalid'
      }))
      return false
    }

    let checked;

    await axios({
      url: `/v1/users/?email=${contactInfo.email}`,
      method: 'GET'
    }).then(res => {
      if(res.data.user){
        setContactInfo((state) =>( {
          ...state,
          emailHasError: true,
          emailHelperText:'E-mail has already been registered'
        }))
        return false
      }
      else{
        setContactInfo((state) =>( {
          ...state,
          emailHasError: false,
          emailHelperText:''
        }))
        return true
      }
    }).then(exists => {
      checked = exists
    })
    
    return checked
  }

  const classes = useStyles()
  return (
    <Card 
      className={classes.root}
      elevation={3}
      variant="outlined"
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
          error={contactInfo.emailHasError}
          helperText={contactInfo.emailHelperText}
          defaultValue={contactInfo.email}
          onChange={(e)=>{
            setContactInfo({email: e.target.value})
          }}
        />
        <StepperControls
          checkIfCanProceed={() => checkInput()}
          onNext={()=>{
            setUserInfo((userInfo) => ({
              ...userInfo,
              email: contactInfo.email
            }))
          }}
        />
      </CardContent>        
    </Card>       
  )
}

export default ContactForm
