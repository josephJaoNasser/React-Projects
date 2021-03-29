import React, { useContext } from 'react'
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
  }
}));

const RegistrationStepper = () => {
  const { activeStep, stepList } = useContext(StepperContext)
  const classes = useStyles();
  const steps = stepList; 
  
  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
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
