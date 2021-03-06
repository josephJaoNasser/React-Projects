import { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { StepperContext, SetActiveStepFunction } from '../routes/Register'
import {  Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backButton: {
    marginRight: theme.spacing(1),
  } 
}));


//component
const StepperControls = ({ canProceed, onNext, checkIfCanProceed }) => {

  const setActiveStep = useContext(SetActiveStepFunction)
  const { activeStep, stepList } = useContext(StepperContext)
  const [isProcessing, setIsProcessing] = useState(false)
  const classes = useStyles();
  const steps = stepList; 

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleNext = async() => {
    setIsProcessing(true)
    
    if( checkIfCanProceed ){
      canProceed = await checkIfCanProceed()  
      setIsProcessing(false)
    }
    
    if(canProceed){
      if(onNext){
        onNext();
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
     
  };

  return (
    <>
      {activeStep === steps.length ? (
        <div>            
          <Button onClick={handleReset}>Reset</Button>
        </div>
      ) : (
        <div>            
          <div>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.backButton}
            >
              Back
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleNext}
              disabled={isProcessing}
            >
              {
                /* if */activeStep === steps.length - 1 ? 'Finish' 
                /* else if */: !isProcessing ? "Next" 
                /* else */: <CircularProgress size={25}/>
              }
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

StepperControls.propTypes ={
  canProceed: PropTypes.bool,
  onNext: PropTypes.func,
  checkIfCanProceed: PropTypes.func
}

StepperControls.defaultProps = {
  canProceed: true
}

export default StepperControls
