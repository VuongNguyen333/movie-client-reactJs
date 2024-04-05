import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import OrderDateTime from './OrderSeat'
import OrderFilm from './Payment'
import OrderSchedule from './OrderSchedule/OrderSchedule'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import SettingsIcon from '@mui/icons-material/Settings'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import VideoLabelIcon from '@mui/icons-material/VideoLabel'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import PaidIcon from '@mui/icons-material/Paid';
import ChairIcon from '@mui/icons-material/Chair';
import OrderSeat from './OrderSeat'
import Payment from './Payment'

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient(136deg, rgb(255, 240, 0) 0%, rgb(0, 200, 0) 100%)'
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient(136deg, rgb(255, 240, 0) 0%, rgb(0, 200, 0) 100%)'
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1
  }
}))

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient(136deg, rgb(255, 240, 0) 0%, rgb(0, 200, 0) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient(136deg, rgb(255, 240, 0) 0%, rgb(0, 200, 0) 100%)'
  })
}))

function ColorlibStepIcon(props) {
  const { active, completed, className } = props

  const icons = {
    1: <PendingActionsIcon />,
    2: <ChairIcon />,
    3: <PaidIcon />
  }

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  )
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node
}

const steps = ['', '', '']

export default function MainOrder() {
  const [activeStep, setActiveStep] = React.useState(0)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }
  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <Box sx={{ bgcolor: '#1a1d29', height: '100vh' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#1a1d29', width: '100%', justifyContent: 'center' }}>
        <Box sx={{ alignItems: 'center', bgcolor: '#1a1d29', width: '60%', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ width: '90%', alignItems: 'center', justifyContent: 'center' }}>
              <Stepper sx={{ color: 'white', alignItems: 'center', justifyContent: 'center', display: 'flex' }} activeStep={activeStep} connector={<ColorlibConnector />}>
                {steps.map((label, index) => {
                  const stepProps = {}
                  const labelProps = {}
                  return (
                    <Step
                      color={'white'}
                      sx={{ color: 'white' }}
                      key={label} {...stepProps}
                    >
                      <StepLabel StepIconComponent={ColorlibStepIcon} sx={{ color: 'white' }} {...labelProps}>{label}</StepLabel>
                    </Step>
                  )
                })}
              </Stepper></Box>
          </Box>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1, color: 'white' }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {activeStep === 0 ? <OrderSchedule /> : activeStep === 1 ? <OrderSeat /> : <Payment />}
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color='warning'
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{
                    mr: 1,
                    '&.MuiButtonBase-root.Mui-disabled': { color: 'white', opacity: 0.5 }
                  }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </Box>
    </Box >
  )
}
