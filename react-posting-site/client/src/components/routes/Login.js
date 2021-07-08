import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header';

//redux
import { connect } from 'react-redux'
import { login } from '../../actions/authActions'

//material ui
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import { 
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Link as MaterialUiLink,
  Snackbar,
  TextField,
} from '@material-ui/core'
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
  
}));

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

//component main
const Login = (props) => {

  const {
    error, 
    isLoading, 
    login
  } = props

  const classes = useStyles()

  //state
  const [userLogin, setUserLogin] = useState({
    username: '',
    password: '',
    showPassword: false
  })

  const [message, setMessage] = useState({
    msg: '',
    success: true
  })

  useEffect(() => {
    if(error){
      setMessage({
        msg: error.msg ? error.msg : `Login failed with status code ${error.status}`, 
        success:false
      })
    }    
  }, [error])

  //functions
  const showPassword = () => {
    setUserLogin({ ...userLogin, showPassword: !userLogin.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const resetMessage = () => {
    setMessage({...message, success:true})
  }

  return (
    <Container>
      <Header justifyContent='center'/>
      <Snackbar
        anchorOrigin={{ vertical:'top', horizontal:'center' }} 
        open={!message.success} 
        onClose={resetMessage}
        autoHideDuration={6000}
      >
        <Alert onClose={resetMessage} severity="error">
          {message.msg}
        </Alert>
      </Snackbar>
      <Container maxWidth="sm">        
        <Card 
          className={classes.root}
          variant='outlined'
        >
          <CardContent className={classes.root}>
            <TextField
              fullWidth
              label="Username or E-mail" 
              variant="outlined"
              onChange={ (e) =>{
                  setUserLogin({
                    ...userLogin, 
                    username: e.target.value                
                  })
                }
              }
            />
            <TextField 
              fullWidth
              variant="outlined" 
              label="Password"
              type={userLogin.showPassword ? 'text' : 'password'}
              error={ error?.field === 'password' }
              defaultValue={userLogin.password}
              autoComplete="current-password"
              onChange={ (e) =>{
                  setUserLogin({
                    ...userLogin, 
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
                    {userLogin.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }}
            />       
            <Button
              variant="contained"
              color="primary"
              style={{marginTop: '1em'}}
              onClick = {()=>login(userLogin)}
              disabled={isLoading}
            >
              { !isLoading ? "Login" : <CircularProgress size={25}/>}             
            </Button>  
            <Container maxWidth="sm" style={{marginTop: '1em'}}>
              Don't have an account yet? &nbsp;
              <Link to="/register" >
                <MaterialUiLink  
                  component="button"
                  variant="body2"
                >
                  Sign up now!
                </MaterialUiLink>             
              </Link>      
            </Container>
          </CardContent>
          
              
        </Card>
      </Container>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  error: state.auth.error,
  isLoading: state.auth.isLoading,
  isAuthenticated: state.auth.isAuthenticated,
  token: state.auth.token
})

export default connect(mapStateToProps, { login })(Login)