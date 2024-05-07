/* eslint-disable no-unused-vars */
import * as React from 'react'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import PendingActionsIcon from '@mui/icons-material/PendingActions'
import OrderSchedule from './OrderSchedule/OrderSchedule'
import ChairIcon from '@mui/icons-material/Chair'
import Typography from '@mui/material/Typography'
import StepLabel from '@mui/material/StepLabel'
import PaidIcon from '@mui/icons-material/Paid'
import Stepper from '@mui/material/Stepper'
import Button from '@mui/material/Button'
import Step from '@mui/material/Step'
import Box from '@mui/material/Box'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import OrderSeat from './OrderSeat/OrderSeat'
import Payment from './Payment'
import { getDetailSeatAPI } from '~/apis/seat'
import { addNewTicketAPI } from '~/apis/ticketApi'
import { toast } from 'react-toastify'
import { useState } from 'react'
import FinishPayment from './FinishPayment'
import { createPaymentAPI } from '~/apis/paymentApi'

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
  const [activeStep, setActiveStep] = useState(0)
  const [branchId, setBranchId] = useState(0)
  const [scheduleId, setScheduleId] = useState(0)
  const [movieId, setMovieId] = useState(0)
  const [enableNext, setEnableNext] = useState(0)
  const [listSeatId, setListSeatId] = useState(() => [])
  const [total, setTotal] = useState(0)
  const [stringSeat, setStringSeat] = useState('')
  const [seats, setSeats] = useState([])
  const [typePayment, setTypePayment] = useState(null)
  const payment = (type) => {
    // console.log('🚀 ~ payment ~ type:', type)
    setTypePayment(type)
    if (type) setEnableNext(1)
  }

  const orderSeat = (listSeat, bill, seatBySchedule) => {
    setSeats(seatBySchedule)
    setTotal(bill)
    const selectedSeat = seatBySchedule.filter((_, index) => listSeat.includes(index))
    // console.log('🚀 ~ orderSeat ~ selectedSeatNames:', selectedSeat)
    const filteredSeatNames = selectedSeat.map(seat => seat.seatResponse.name)
    const filteredSeatId = selectedSeat.map(seat => seat.id)
    setListSeatId(filteredSeatId)
    // console.log('🚀 ~ orderSeat ~ filteredSeatNames:', filteredSeatNames)
    setStringSeat(filteredSeatNames.join(', '))
    if ( activeStep === 2 || listSeat.length>1) setEnableNext(1)
    else setEnableNext(0)
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      if (prevActiveStep === 2) {
        const formData = {
          userId: parseInt(localStorage.getItem('userId')),
          seatScheduleId: listSeatId,
          amount: total * 1000
        }
        // console.log('🚀 ~ MainOrder ~ typePayment:', typePayment)
        // console.log('🚀 ~ setActiveStep ~ form:', formData)
        // Call Api
        // addNewTicketAPI(form).then()
        createPaymentAPI(formData).then(res => {
          // console.log('🚀 ~ createPaymentAPI ~ res:', res)
          if (res) {
            window.location.href = res.url
          }
        })
      }
      return prevActiveStep + 1
    })
    setEnableNext(0)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }
  const handleReset = () => {
    setActiveStep(0)
  }

  const orderSchedule = (branchId, scheduleId, movieId) => {
    setBranchId(branchId)
    setScheduleId(scheduleId)
    setMovieId(movieId)
    setEnableNext(1)
    // console.log('🚀 ~ orderSchedule ~ branchId, scheduleId, movieId:', branchId, scheduleId, movieId)
  }
  return (
    <Box sx={{ bgcolor: '#1a1d29', height: '100%', width: '100%', display: 'flex', alignItems:'center', justifyContent: 'center', overflowY: 'auto' }}>
      <Box sx={{ bgcolor: '#1a1d29', height: '100%', width: '80%', overflowY: 'hidden', ':hover': { overflowY: 'auto' }, alignItems:'center', justifyContent: 'center' }} >
        <Box sx={{ display: 'flex', alignItems:'center', justifyContent: 'center' }}>
          <Box sx={{ alignItems: 'center', bgcolor: '#1a1d29', height: '100%', width: '80%', justifyContent: 'center' }}>
            <Box sx={{ alignItems: 'center', bgcolor: '#1a1d29', width: '100%', justifyContent: 'center' }}>
              <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ width: '75%', alignItems: 'center', justifyContent: 'center' }}>
                  <Stepper sx={{ color: 'white', alignItems: 'center', justifyContent: 'center', display: 'flex' }} activeStep={activeStep} connector={<ColorlibConnector />}>
                    {steps.map((label) => {
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
                <FinishPayment handleReset={handleReset} />
              ) : (
                <React.Fragment>
                  {activeStep === 0 ?
                    <OrderSchedule orderSchedule={orderSchedule} />
                    : activeStep === 1
                      ? <OrderSeat
                        branchId={branchId}
                        scheduleId={scheduleId}
                        orderSeat={orderSeat}
                      />
                      : <Payment
                        branchId={branchId}
                        scheduleId={scheduleId}
                        total={total}
                        stringSeat={stringSeat}
                        payment={payment}
                        listSeatId={listSeatId}
                      />
                  }
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
                    <Button
                      onClick={handleNext}
                      disabled={enableNext === 0}
                      sx={{
                        '&.MuiButtonBase-root.Mui-disabled': { color: 'white', opacity: 0.5 },
                        color: '#16FF00'
                      }}
                    >
                      Next
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </Box>
          </Box>
        </Box>
      </Box >
    </Box>
  )
}
