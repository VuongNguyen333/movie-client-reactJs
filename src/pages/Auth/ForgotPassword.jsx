/* eslint-disable no-console */
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import Send from '@mui/icons-material/Send'
import { resetPasswordAPI, sendOtpAPI, sendReqForgotPasswordAPI } from '~/apis/auth'
import { useState } from 'react'
import { convertResOtp } from '~/utils/convertResOtp'
import { toast } from 'react-toastify'
import { CircularProgress, IconButton, InputAdornment } from '@mui/material'

function ForgotPassword({ open, handleClose }) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
    maxHeight: '90%',
    overflowY: 'auto',
    minWidth: 150
  }
  const styleTextField = {
    display: 'flex',
    margin: '10px 10px 15px 10px',
    fontSize: '10px',
    '& label': { color: '#5C5470' },
    '& label.Mui-focused': { color: '#1976d2' },
    '& .MuiOutlinedInput-root': {
      fontSize: '0,5rem',
      '& fieldset': { borderWidth: '0.5px !important', borderColor: '#C9CCD5' },
      '&:hover fieldset': { borderWidth: '2px !important', borderColor: '#C9CCD5' },
      '&.Mui-focused fieldset': { borderWidth: '2px !important', borderColor: '#1976d2' }
    },
    '& .MuiInputBase-root.Mui-focused': {
      color: '#394867'
    },
    '& .MuiInputBase-root': {
      color: '#394867'
    },
    '& input:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 100px #EEF5FF inset !important',
      WebkitTextFillColor: '#394867!important'
    }
  }

  const [emailReq, setEmailReq] = useState('')
  const [otpSys, setOtpSys] = useState(null)
  const [otp, setOtp] = useState(null)
  const [step1, setStep1] = useState(true)
  const [step2, setStep2] = useState(false)
  const [step3, setStep3] = useState(false)
  const [otpExpirationTime, setOtpExpirationTime] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showCfPassword, setShowCfPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmitForgotPass = (event) => {
    setLoading(true)
    event.preventDefault()
    const formData = new FormData(event.target)
    const email = formData.get('emailReq')
    console.log('🚀 ~ handleSubmitForgotPass ~ email:', email)
    sendReqForgotPasswordAPI(email)
      .then(res => {
        console.log('🚀 ~ handleSubmitForgotPass ~ res:', res)
        setEmailReq(email)
        setOtpExpirationTime(convertResOtp(res.otpexpirationTime))
        setOtpSys(res.otp)
        setStep1(false)
        setStep2(true)
      } )
      .catch(err => console.log(err))
      .finally(() => {
        setLoading(false) // Kết thúc loading sau khi nhận được phản hồi từ API
      })
  }
  const handleSubmitOtp = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const data = {
      'systemOTP' : otpSys,
      'userOTP' : formData.get('otp'),
      'OTPExpirationTime' : otpExpirationTime
    }
    console.log('🚀 ~ handleSubmitOtp ~ data:', data)
    sendOtpAPI(data)
      .then(res => {
        console.log('🚀 ~ handleSubmitOtp ~ res:', res)
        if (res === true) {
          toast.success('Xác thực thành công!')
          setStep2(false)
          setStep3(true)
        } else {
          toast.error('Mã OTP không chính xác! Hãy thử lại.')
        }
      })
  }

  const handleResetPass = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const pass = formData.get('password')
    const cfPass = formData.get('confirmPass')
    if (pass === cfPass) {
      resetPasswordAPI ({ email: emailReq, password: pass })
        .then(() => {
          toast.success('Cập nhật mật khẩu thành công!')
          setStep3(false)
          setStep1(true)
          handleClose()
        })
    } else {
      toast.error('Mật khẩu không trùng khớp!')
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const toggleCfPasswordVisibility = () => {
    setShowCfPassword(!showCfPassword)
  }
  return (
    <Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          { step1 &&
            <form onSubmit={handleSubmitForgotPass}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Enter your email
              </Typography>
              { loading && <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2
              }}>
                <CircularProgress />
                <Typography>Loading...</Typography>
              </Box> }
              <TextField value={emailReq} onChange={(event) => setEmailReq(event.target.value)} name='emailReq' label="Email" required variant="outlined" id="validation-outlined-input" sx={{ mb: '10px', width: '100%' }} />
              <Button sx={{ bgcolor:'green', ':hover': { bgcolor:'#90D26D' } }} variant="contained" endIcon={<Send />} type='submit'>
                Send
              </Button>
            </form>
          }
          { step2 &&
            <form onSubmit={handleSubmitOtp}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                OTP Authentication
              </Typography>
              <Typography id="modal-modal-title" sx={{ fontStyle:'italic', fontSize:'small' }}>
                The OTP code has been sent to your email.
              </Typography>
              <Typography id="modal-modal-title" sx={{ fontStyle:'italic', fontSize:'small', mb:0.5, color:'red' }}>
                The OTP code is valid for 5 minutes from the time it is sent.
              </Typography>
              <TextField value={otp} onChange={(event) => setOtp(event.target.value)} name='otp' label="Enter OTP" required variant="outlined" id="validation-outlined-input" sx={{ mb: '10px', width: '100%' }} />
              <TextField value={emailReq} disabled name='emailReq' label="Email" required variant="outlined" id="validation-outlined-input" sx={{ mb: '10px', width: '100%' }} />
              <Button sx={{ bgcolor:'green', ':hover': { bgcolor:'#90D26D' } }} variant="contained" endIcon={<Send />} type='submit'>
                Send
              </Button>
            </form> }
          {step3 &&
            <form onSubmit={handleResetPass}>
              <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb:0.5 }}>
                Change Password
              </Typography>
              <TextField
                required
                label="Password"
                name = 'password'
                value = {password}
                type={showPassword ? 'text' : 'password'}
                size='small'
                sx={styleTextField}
                onChange={(event) => setPassword(event.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} size='small'>
                        {showPassword ? <VisibilityOffIcon sx={{ color: '#394867' }} /> : <VisibilityIcon sx={{ color: '#394867' }} />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                required
                name = 'confirmPass'
                label="Enter Confirm Password"
                type={showCfPassword ? 'text' : 'password'}
                size="small"
                value={confirmPass}
                onChange={(event => setConfirmPass(event.target.value))}
                sx={styleTextField}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleCfPasswordVisibility} size='small'>
                        {showCfPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <Button sx={{ bgcolor:'green', ':hover': { bgcolor:'#90D26D' } }} variant="contained" endIcon={<Send />} type='submit'>
                Send
              </Button>
            </form>
          }
        </Box>
      </Modal>
    </Box>
  )
}

export default ForgotPassword