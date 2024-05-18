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
import { createPaymentVnPayAPI, createPaymentZaloPayAPI } from '~/apis/paymentApi'
import { useRef } from 'react'
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'
import removeSameSeatId from '~/utils/removeSameSeat'
import removeSameSeat2Arr from '~/utils/removeSameSeat2Arr'
import { useEffect } from 'react'
import findDiff from '~/utils/findDiff'

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
  const [listSeatIdToReq, setListSeatIdToReq] = useState(() => [])
  const [total, setTotal] = useState(0)
  const [stringSeat, setStringSeat] = useState('')
  const [seats, setSeats] = useState([])
  const [typePayment, setTypePayment] = useState(null)
  const [stompClient, setStompClient] = useState(null)
  const [myListSeat, setMyListSeat] = useState([])
  const [listSeatId, setListSeatId] = useState([])
  const [isDisconnected, setIsDisconnected] = useState(false)
  const listSeatIdRef = useRef(listSeatId)
  const myListSeatRef = useRef(myListSeat)
  const activeStepRef = useRef(activeStep)
  const payment = (type) => {
    setTypePayment(type)
    if (type) setEnableNext(1)
  }

  useEffect(() => {
    const exceptions = ['http://localhost:5173']
    let isLeaving = false

    const isExceptionUrl = (url) => {
      return exceptions.some(exception => url.startsWith(exception))
    }

    const handleBeforeUnload = (event) => {
      if (isExceptionUrl(window.location.href) && !isLeaving) {
        event.preventDefault()
        event.returnValue = '' // Mặc định cho Chrome
        return '' // Mặc định cho Firefox
      }
    }

    const confirmExit = (event) => {
      console.log('🚀 ~ confirmExit ~ activeStepRef.current:', activeStepRef.current)
      if (isExceptionUrl(window.location.href) && !isLeaving && activeStepRef.current !== 2) {
        const message = 'Bạn có chắc muốn rời khỏi trang?'
        event.returnValue = message
        return message
      }
    }

    const handlePageHide = (event) => {
      if (isExceptionUrl(window.location.href) && !isLeaving) {
        if (stompClient && stompClient.connected) {
          stompClient.send('/app/reserve', {}, JSON.stringify(myListSeatRef.current) + 'leave')
          setMyListSeat([])
          stompClient.disconnect()
          setStompClient(null)
          setIsDisconnected(true)
        }
      }
    }

    const handleWindowUnload = () => {
      isLeaving = true
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('unload', confirmExit)
    window.addEventListener('pagehide', handlePageHide)
    window.addEventListener('unload', handleWindowUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('unload', confirmExit)
      window.removeEventListener('pagehide', handlePageHide)
      window.removeEventListener('unload', handleWindowUnload)
    }
  }, [stompClient])

  useEffect(() => {
    console.log('🚀 ~ handleFormat :', listSeatId)
    listSeatIdRef.current = listSeatId
    // Perform any action with the updated listSeatId
  }, [listSeatId])

  useEffect(() => {
    console.log('reset')
    // Perform any action with the updated listSeatId
  }, [stompClient])
  useEffect(() => {
    activeStepRef.current = activeStep
    // Perform any action with the updated listSeatId
  }, [activeStep])

  useEffect(() => {
    const token = localStorage.getItem('token')
    const socket = new SockJS(`http://localhost:8080/ws?token=${token}`)
    const client = Stomp.over(socket)

    client.connect({}, () => {
      client.send('/app/reserve', {}, 'join')
      setIsDisconnected(false)
      client.subscribe('/topic/seats', (message) => {
        const arraySeats = message.body.slice(1, -1).split(',')
        // console.log('🚀 ~ client.subscribe ~ arraySeats:', arraySeats)
        const newIntArray = arraySeats.map(str => parseInt(str, 10))
        setListSeatId(removeSameSeatId(newIntArray))
        // console.log('🚀 ~ handleFormat ~ listToReq:', listSeatId)
      })
    })
    setStompClient(client)

    return () => {
      if (client && client.connectHeaders && !stompClient && activeStepRef.current!==2) {
        console.log('🚀 ~ return ~ activeStep:', activeStepRef.current)
        client.send('/app/reserve', {}, JSON.stringify(myListSeatRef.current) + 'leave')
        setMyListSeat([])
        client.disconnect()
      }
    }
  }, [isDisconnected])
  useEffect(() => {
    myListSeatRef.current = myListSeat
    // Perform any action with the updated listSeatId
  }, [myListSeat])

  const orderSeat = (listSeat, bill, seatBySchedule) => {
    setSeats(seatBySchedule)
    setTotal(bill)
    const selectedSeat = seatBySchedule.filter((item) => listSeat.includes(item.id))
    // console.log('🚀 ~ orderSeat ~ selectedSeatNames:', selectedSeat)
    const filteredSeatNames = selectedSeat.map(seat => seat.seatResponse.name)
    let listToReq = []
    if (listSeat.length > myListSeat.length) {
      listToReq = [findDiff(myListSeat, listSeat)[0]]
    } else {
      listToReq = [findDiff(myListSeat, listSeat)[0]]
    }
    setListSeatIdToReq(listSeat)
    setMyListSeat(listSeat)
    const listSeatToSocket = listToReq.join()
    if (stompClient && stompClient.connected) {
      stompClient.send('/app/reserve', {}, JSON.stringify(listSeatToSocket))
    } else {
      console.error('STOMP client is not connected')
    }
    // console.log('🚀 ~ orderSeat ~ filteredSeatNames:', filteredSeatNames)
    setStringSeat(filteredSeatNames.join(', '))
    if ( activeStep === 2 || listSeat.length>=1) setEnableNext(1)
    else setEnableNext(0)
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      if (prevActiveStep === 2) {
        const formData = {
          userId: parseInt(localStorage.getItem('userId')),
          seatScheduleId: listSeatIdToReq,
          amount: total * 1000
        }
        localStorage.setItem('seatScheduleId', JSON.stringify(listSeatIdToReq))
        if (typePayment === 'VnPay') {
          createPaymentVnPayAPI(formData).then(res => {
            // console.log('🚀 ~ createPaymentAPI ~ res:', res)
            if (res) {
              window.location.href = res.url
            }
          })
        }
        else {
          createPaymentZaloPayAPI(formData).then(res => {
            // console.log('🚀 ~ createPaymentAPI ~ res:', res)
            if (res) {
              window.location.href = res.order_url
            }
          })
        }
        stompClient.send('/app/reserve', {}, JSON.stringify(myListSeatRef.current) + 'payment')
      }
      activeStepRef.current = prevActiveStep + 1
      return prevActiveStep + 1
    })
    setEnableNext(0)
  }

  const handleBack = () => {
    stompClient.send('/app/reserve', {}, JSON.stringify(myListSeatRef.current) + 'leave')
    setMyListSeat([])
    myListSeatRef.current = []
    stompClient.disconnect()
    setIsDisconnected(true)
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
                        listSeatId = {listSeatId}
                        currentListSeat={myListSeatRef.current}
                      />
                      : <Payment
                        branchId={branchId}
                        scheduleId={scheduleId}
                        total={total}
                        stringSeat={stringSeat}
                        payment={payment}
                        listSeatIdToReq={listSeatIdToReq}
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
