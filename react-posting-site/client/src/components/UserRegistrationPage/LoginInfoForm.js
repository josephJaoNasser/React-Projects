import React, { useState, useContext } from 'react'
import { SetUserInfoFunction } from '../routes/Register'
import StepperControls from './StepperControls'

//material ui
import { makeStyles } from '@material-ui/core/styles';
import {  
  Card,
  CardContent,
  TextField,
  Typography,
  IconButton,
  InputAdornment  
} from '@material-ui/core';
import {
  Visibility,
  VisibilityOff 
}from '@material-ui/icons';



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

//cpmonent main
const LoginInfoForm = () => {
  const classes = useStyles()
  //state
  const submitLoginInfo = useContext(SetUserInfoFunction)  
  const [usernameState, setUsername] = useState({
    username: '',
    usernameHasError: false,
    usernameHelperText: ''
  });

  const [passwordState, setPassword] = useState({
    password: '',
    confirm_password: '',
    showPassword: false,
    passwordHasError: false,
    passwordHelperText: ''
  });

  //functions
  const showPassword = () => {
    setPassword({ ...passwordState, showPassword: !passwordState.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //check 
  const checkInput = () => {    
    if(!usernameState.username.length){
      setUsername({ 
        ...usernameState, 
        usernameHasError: true, 
        usernameHelperText: 'Please enter a username' 
      });
      return false
    }
    else if(usernameState.username.length){
      setUsername({ 
        ...usernameState, 
        usernameHasError: false,
        usernameHelperText: '' 
      });
    }

    if(passwordState.password.length < 6){
      setPassword({ 
        ...passwordState, 
        passwordHasError: true, 
        passwordHelperText: 'Passwords must be at least 6 characters' 
      });
      return false
    }
    else if(passwordState.confirm_password !== passwordState.password){
      setPassword({ 
        ...passwordState, 
        passwordHasError: true, 
        passwordHelperText: 'Passwords do not match' 
      });
      return false
    }
    else{
      setPassword({ 
        ...passwordState, 
        passwordHasError: false,
        passwordHelperText: '' 
      });
    }

    return true
  }

  //html
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
          Add your login information!
        </Typography>    
        <TextField 
          required 
          error={usernameState.usernameHasError}
          helperText={usernameState.usernameHelperText}
          label="Username" 
          type="username"
          variant="outlined" 
          onChange={ (e) => {            
              setUsername({
                ...usernameState, 
                username: e.target.value
              })
            }
          }
        />
        <br/>
        <TextField 
          required 
          variant="outlined" 
          label="Password"
          type={passwordState.showPassword ? 'text' : 'password'}
          value={passwordState.password}
          error={passwordState.passwordHasError}
          autoComplete="current-password"
          onChange={ (e) =>{
              setPassword({
                ...passwordState, 
                password: e.target.value                
              })
            }
          }
          InputProps= {{
            endAdornment:  
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={showPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {passwordState.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }}
        />
        <br/>
        <TextField 
          required 
          variant="outlined" 
          label="Password"
          type={passwordState.showPassword ? 'text' : 'password'}
          value={passwordState.confirm_password}
          error={passwordState.passwordHasError}
          autoComplete="current-password"
          onChange={e => setPassword({...passwordState, confirm_password:e.target.value})}
          helperText={passwordState.passwordHelperText}
          InputProps= {{
            endAdornment:  
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={showPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {passwordState.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }}
        />
        <br/><br/>
        <StepperControls           
          checkIfCanProceed={ checkInput  }
          onNext={()=>{
              submitLoginInfo((userInfo)=>({
                ...userInfo, 
                username: usernameState.username,
                password: passwordState.password,
                confirm_password: passwordState.confirm_password
              }))
            }
          }
        />
      </CardContent>        
    </Card>       
  )
}

export default LoginInfoForm