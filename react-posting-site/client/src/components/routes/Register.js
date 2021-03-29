import React, { useState, createContext, lazy, Suspense } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { CircularProgress,Button } from '@material-ui/core'

//components
const RegistrationStepper = lazy(()=>import('../UserRegistrationPage/RegistrationStepper'))  
const RegistrationForm = lazy(()=>import('../UserRegistrationPage/RegistrationForm')) 

//create context for the stepper
export const StepperContext = createContext()
export const SetActiveStepFunction = createContext()
export const SetUserInfoFunction = createContext()

//component main
export const Register = ({ props }) => {

  //state
  const [activeStep, setActiveStep] = useState(0);
  const [userInfo, setUserInfo] = useState({
    username: '', 
    displayName: '', 
    password: '',
    confirm_password: '', 
    email: '', 
    filename: '', 
    bio: '' 
  });

  const [stepList] = useState([
    'Login information', 
    'Add a bio',
    'Add a profile image', 
    'Contact info'
  ])

  //methods


  //html
  return (
    <Suspense
      fallback={
        <CircularProgress/>
      }
    >
      <StepperContext.Provider value={{activeStep, stepList}}>        
        <RegistrationStepper />       
        <SetActiveStepFunction.Provider value={setActiveStep}>
          <SetUserInfoFunction.Provider value={setUserInfo}>
            <RegistrationForm/>     
          </SetUserInfoFunction.Provider>                          
        </SetActiveStepFunction.Provider>          
      </StepperContext.Provider>  
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
            onClick={()=>console.log(userInfo)}
          >
            Submit
          </Button>
        </div>          
      }
    </Suspense>    
  )
}

Register.propTypes = {
  props: PropTypes.func
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, {mapDispatchToProps})(Register)
