import  { useState, useEffect, createContext, lazy, Suspense } from 'react'
import PropTypes from 'prop-types'

//redux
import { connect } from 'react-redux'
import { registerUser } from '../../actions/authActions'

//material ui
import { CircularProgress,Button, Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import Header from '../Header'

//components
const RegistrationStepper = lazy(()=>import('../UserRegistrationPage/RegistrationStepper'))  
const RegistrationForm = lazy(()=>import('../UserRegistrationPage/RegistrationForm')) 

//create context for the stepper
export const StepperContext = createContext()
export const SetActiveStepFunction = createContext()
export const UserInfoState = createContext()

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


//component main
const Register = ({ registerUser, isLoading, error, token }) => {

  //state
  const [activeStep, setActiveStep] = useState(0);

  const [userInfo, setUserInfo] = useState({
    username: '', 
    displayName: '', 
    password: '',
    confirm_password: '', 
    email: '', 
    profile_image: null,
    profile_image_url: null, 
    bio: '' 
  });

  const [message, setMessage] = useState({
    msg: '',
    success: true
  })

  const [stepList] = useState([
    'Login information', 
    'Add a bio',
    'Add a profile image', 
    'Contact info'
  ])

  useEffect(() => {
    if(error){
      setMessage({
        msg: error.msg ?
          error.msg :
          error.message, 
        success:false
      })
    }    
  }, [error])

  useEffect(()=> {
    if(token){
      alert('EYYY REGISTERED BOII')
    }
  }, [token])

  //functions
  const resetMessage = () => {
    setMessage({...message, success:true})
  }

  //html
  return (
    <Suspense
      fallback={
        <CircularProgress/>
      }
    >
      <Header title="Register | Post App" justifyContent='center'/>
      <StepperContext.Provider value={{activeStep, stepList}}>        
        <RegistrationStepper />       
        <SetActiveStepFunction.Provider value={setActiveStep}>
          <UserInfoState.Provider value={{userInfo, setUserInfo}}>
            <RegistrationForm/>     
          </UserInfoState.Provider>                          
        </SetActiveStepFunction.Provider>          
      </StepperContext.Provider>  

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
      
      {
        activeStep === 4 &&
        <div className='confirm-register'>
          <Button 
            onClick={()=>setActiveStep((prevActiveStep)=> prevActiveStep -1)}
          >
            Back
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            onClick={()=>registerUser(userInfo)}
          >
            Register now!
          </Button>
        </div>          
      }
    </Suspense>    
  )
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
  error: state.auth.error,
  token: state.auth.token
})


export default connect(mapStateToProps, { registerUser })(Register)
