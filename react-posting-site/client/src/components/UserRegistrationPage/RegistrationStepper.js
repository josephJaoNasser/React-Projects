import { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { StepperContext } from '../routes/Register'
import {
  Step,
  StepLabel,
  Stepper
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: '0 auto'
  },
  transparentBackground:{
    background: 'rgba(0, 0, 0, 0)'
  }
}));

const RegistrationStepper = () => {
  const { activeStep, stepList } = useContext(StepperContext)
  const classes = useStyles();
  const steps = stepList; 
  
  return (
    <div className={classes.root}>
      <Stepper 
        activeStep={activeStep} 
        alternativeLabel
        classes={{
          root: classes.transparentBackground
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>      
    </div>
  );
}

export default RegistrationStepper
