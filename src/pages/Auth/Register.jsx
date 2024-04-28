/* eslint-disable no-restricted-imports */
/* eslint-disable react/no-unescaped-entities */
import Box from '@mui/material/Box'
import React, { useState } from 'react'
import loginImage from '~/assets/nen3.jpg'
import SvgIcon from '@mui/material/SvgIcon'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import SecurityIcon from '@mui/icons-material/Security'
import Link from '@mui/material/Link'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerAPI } from '~/apis/auth'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'
import { Stack, Tooltip } from '@mui/material'
import styled from '@emotion/styled'
import { convertDate } from '~/admin/utils/convertDate'
function Register() {
  const ProSpan = styled('span')({
    display: 'inline-block',
    height: '1em',
    width: '1em',
    verticalAlign: 'middle',
    marginLeft: '0.3em',
    marginBottom: '0.08em',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundImage: 'url(https://mui.com/static/x/pro.svg)'
  })
  
  function Label({ isProOnly }) {
    const content = (
      <span>
        <Box >Date of birth</Box>
      </span>
    )
  
    if (isProOnly) {
      return (
        <Stack direction="row" spacing={0.5} component="span">
          <Tooltip title="Included on Pro package">
            <a
              href="https://mui.com/x/introduction/licensing/#pro-plan"
              aria-label="Included on Pro package"
            >
              <ProSpan />
            </a>
          </Tooltip>
          {content}
        </Stack>
      )
    }
  
    return content
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
    }
  }
  const initFormData = {
    fullName : '',
    password : '',
    confirmPass: '',
    dob : ''
  }

  const negative = useNavigate()
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [isValidEmail, setIsValidEmail] = useState(true)
  const [isValidPass, setIsValidPass] = useState(true)
  const [msgEmail, setMsgEmail] = useState('')
  const [msgPass, setMsgPass] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showCfPassword, setShowCfPassword] = useState(false)
  const [formDataInit, setFormDataInit] = useState(initFormData)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormDataInit((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleEmailChange = (event) => {
    const tmpEmail = event.target.value
    setEmail(tmpEmail)
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(tmpEmail)
    if (isValidEmail) {
      // Xử lý logic khi email hợp lệ
      setIsValidEmail(true)
    } else {
      setIsValidEmail(false)
      setMsgEmail('❌ Email không hợp lệ. VD: abc@gmail.com')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    if (isValidEmail && isValidPass) {
      const pass = formData.get('password')
      const confirmPass = formData.get('confirmPass')
      if (pass !== confirmPass) {
        toast.error('Mật khẩu không trùng khớp ')
      } else {
        const data = {
          'fullName' : formData.get('fullName'),
          'email' : formData.get('email'),
          'password' : formData.get('password'),
          'dob' : convertDate.convertToRequest(formData.get('dob'))
        }
        console.log('🚀 ~ handleSubmit ~ data:', data)
        registerAPI(data)
          .then(res => {
            if (res) {
              toast.success('Đăng kí thành công!')
              setFormDataInit(initFormData)
              setEmail('')
            }
          })
          .catch()
      }
    } else {
      toast.error('Email hoặc mật khẩu không hợp lệ!')
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const toggleCfPasswordVisibility = () => {
    setShowCfPassword(!showCfPassword)
  }

  const styleBoxIcon = {
    borderRadius: '50%',
    height: '38px',
    width: '38px',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    mr: '5px'
  }
  return (
    <div style={{
      backgroundImage: `url(${loginImage})`,
      backgroundSize: 'cover',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      width: '100%'

    }}>
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.6)',
            borderRadius: '15px',
            minWidth:'40%'
          }}
        >
          <Box sx={{ justifyContent: 'center', display: 'flex', p: 1 }}>
            <Box bgcolor='#1976d2' sx={styleBoxIcon} >
              <SecurityIcon sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'white'
              }}
              bgcolor='#1976d2'
              fontSize='small'
              />
            </Box>
          </Box>
          <Typography
            variant='h6'
            gutterBottom
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: '15px',
              color: '#1976d2'
            }}
          >
            Sign up
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              required
              name = 'fullName'
              label="Full Name..."
              sx={styleTextField}
              size='small'
              value={formDataInit.fullName}
              onChange={handleChange}
            />
            <TextField
              required
              name = 'email'
              label="Email..."
              sx={styleTextField}
              size='small'
              value={email}
              onChange={handleEmailChange}
              error={!isValidEmail}
              helperText={!isValidEmail ? `${msgEmail}` : null}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                required
                components={[
                  'DatePicker',
                  'TimePicker',
                  'DateTimePicker',
                  'DateRangePicker'
                ]}
                sx={{ mb: '5px', p:1 }}
              >
                <DemoItem required label={<Label componentName="DatePicker" valueType="release" />}>
                  <DatePicker required name='dob' />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
            <TextField
              name = 'password'
              label="Enter Password"
              type={showPassword ? 'text' : 'password'}
              size="small"
              value={formDataInit.password}
              onChange={handleChange}
              sx={styleTextField}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} size='small'>
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <TextField
              name = 'confirmPass'
              label="Enter Confirm Password"
              type={showCfPassword ? 'text' : 'password'}
              size="small"
              value={formDataInit.confirmPass}
              onChange={handleChange}
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
            <Box sx={{ justifyContent: 'center', display: 'flex', p: 1 }}>
              <Button
                type='submit'
                variant="contained"
                sx={{
                  alignItems: 'center',
                  justifyItems: 'center',
                  width: '300px',
                  bgcolor: '#1976d2',
                  '&:hover': { bgcolor: '#1976d2' }
                }}
              >
                Create your account
              </Button>
            </Box>
          </form>
          <Box sx={{ justifyContent: 'center', display: 'flex', p: 1 }}>
            <Typography > Already have an account?</Typography>
          </Box>
          <Box sx={{ justifyContent: 'center', display: 'flex', mb: '15px' }}>
            <Link
              onClick={() => {
                negative('/login', { replace: true })
              }}
              underline="hover"
              sx={{
                '&:hover ': { color: '#29ADB2', cursor: 'pointer' }
              }}
            >
              {'Sign in'}
            </Link>
          </Box>
        </Box>
      </Container>
    </div >

  )
}

export default Register