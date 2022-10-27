import { Step, StepLabel, Stepper } from '@mui/material'
import React from 'react'
import {  styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';

export default function MyStepper({activeStep,steps}) {
    const status = useSelector(state => state.colorCommon.status)
    const CssStepper = styled(StepLabel)({
        '& .MuiStepLabel-label':{
            color :!status && '#999'
        },
        '& .MuiStepLabel-labelContainer .Mui-active':{
            color :!status && 'white'
        }
      });
  return (
    <Stepper sx={{padding : '20px'}} activeStep={activeStep} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <CssStepper>{label}</CssStepper>
                    </Step>
                  ))}
                </Stepper>
  )
}
