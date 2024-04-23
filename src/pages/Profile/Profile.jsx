/* eslint-disable no-restricted-imports */
import { Button, Container, IconButton, InputAdornment, Stack, TextField, Tooltip, Typography, makeStyles } from '@mui/material'
import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import { getUserByIdAPI, updateUserClientByIdAPI } from '~/apis/userApi'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Footer from '~/components/Footer'
import Navbar from '~/components/NavBar/NavBar'
import styled from '@emotion/styled'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { Visibility } from '@mui/icons-material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'
import dayjs from 'dayjs'
import { convertDate } from '~/admin/utils/convertDate'
function Profile() {
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

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1
  })
  const ValidationTextField = styled(TextField)({
    '& input:valid + fieldset': {
      borderColor: '#E0E3E7',
      borderWidth: 1
    },
    '& input:invalid + fieldset': {
      borderColor: 'red !important',
      borderWidth: 1
    },
    '& input:valid:focus + fieldset': {
      borderLeftWidth: 4,
      padding: '4px !important'
    }
  })
  const styleTextField = {
    color:'white',
    display: 'flex',
    // margin: '10px 10px 15px 10px',
    fontSize: '10px',
    '& .MuiOutlinedInput-root': {
      'height' : '40px',
      'color' : 'white',
      fontSize: '0,5rem',
      '& fieldset': { borderWidth: '0.5px !important', borderColor: '#454D6A !important' },
      '&:hover fieldset': { borderWidth: '2px !important', borderColor: '#87A922 !important' },
      '&:disabled fieldset' : { color:'#454D6A' },
      '&.Mui-focused fieldset': { borderWidth: '2px !important', borderColor: '#454D6A' }
    },
    '& .MuiInputBase-root.Mui-focused': {
      color: 'white'
    }
  }

  const styleTextFieldDisable = {
    width:'100%',
    '& .MuiInputBase-root.Mui-disabled': {
      height: '40px',
      bgcolor: '#24262B',
      '& fieldset': { borderWidth: '0.5px !important', borderColor: '#454D6A' }
    },
    '& input:disabled': {
      color: 'white',
      WebkitTextFillColor: 'white'
    }
  }

  const styleButton = {
    width: '100%',
    height: '35px',
    borderRadius: '5px',
    border: 'none',
    outline: '0',
    color: 'white',
    background: 'linear-gradient(180deg, #72be43, #F0FF42)',
    textAlign: 'center',
    cursor: 'pointer',
    fontSize: '9px',
    ':hover': {
      opacity: 0.7
    },
    mr:'20px'
    // minWidth:'50%'
  }

  const [user, setUser] = useState({})
  const [avatar, setAvatar] = useState('')
  const [photo, setPhoto] = useState({})
  const [fileName, setFileName] = useState('')
  const [isToggle, setIsToggle] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showCfPassword, setShowCfPassword] = useState(false)
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const togglePasswordVisibilityCf = () => {
    setShowCfPassword(!showCfPassword)
  }
  useEffect(() => {
    getUserByIdAPI(localStorage.getItem('userId'))
      .then(res => {
        setUser(res)
        setAvatar(res.avatar)
      })
  }, [])

  const handleFileInputChange = (event) => {
    const file = event.target.files[0]
    setPhoto(file)
    setFileName(file.name)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const data = {
      'fullName': formData.get('fullName'),
      'dob': formData.get('date'),
      'photo': photo
    }
    console.log('🚀 ~ handleSubmit ~ data:', data)
    updateUserClientByIdAPI(data, user.id).then(res => {
      setAvatar(res.avatar)
      setUser(res)
    })
  }
  return (
    <Container disableGutters maxWidth={false}>
      <Navbar avatar={avatar} />
      {/* <Hero></Hero> */}
      {/* <HeroPro /> */}
      <Box sx={{ bgcolor:'#1a1d29' }}>
        <Box sx={{ color:'#1a1d29' }}>1</Box>
        <Box sx={{ color:'#1a1d29' }}>1</Box>
        <Box sx={{ color:'#1a1d29' }}>1</Box>
        <div style={{ bgcolor:'#1a1d29', color:'white' }}>
          <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', typography:'h5', fontWeight:'bold', mb:'30px' }}>Tài khoản</Box>
          <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
            <form onSubmit={handleSubmit}>
              <Box sx={{ border:'2px solid #454D6A', borderRadius:'8px', width:'50%', padding:2, minWidth:'fit-content' }}>
                <Box sx={{ display:'flex' }}>
                  <Box>
                    <img style={{ width:135, height:135, borderRadius:'50%' }} alt="Avatar" src={`data:image/jpeg;base64,${avatar}`} />
                    <Box>
                    </Box>
                    <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon fontSize='small'/>}
                      sx={styleButton}
                    >
                    Upload avatar
                      <VisuallyHiddenInput color='white' name='photo' type="file" onChange={handleFileInputChange} />
                    </Button>
                    <p style={{ maxWidth:200 }}>{fileName}</p>
                  </Box>
                  <Box sx={{ ml:'30px' }}>
                    <Box sx={{ color:'#87A922', typography:'h5' }}>{user.fullName}</Box>
                    <Box sx={{ display:'flex' }}>
                    Số vé đã đặt: {<Typography sx={{ ml:1, color:'#87A922' }} >{user.numberOfTickets}</Typography>}
                    </Box>
                    <Box sx={{ display:'flex' }}>
                    Tổng chi tiêu: {<Typography sx={{ ml:1, color:'#87A922' }} >{user.totalPayment}.000đ</Typography>}
                    </Box>
                    <Typography fontStyle='italic' sx={{ fontSize:13, color:'#CCC' }}>Vui lòng đăng ảnh chân dung, thấy rõ mặt có kích thước: ngang 200 pixel và dọc 200 pixel (dung lượng dưới 1MB)</Typography>
                  </Box>
                </Box>
                <Box sx={{ border:'1px solid #9BA4B5', mb:2 }}></Box>
                <Box>
                  <Box>Tên*</Box>
                  <ValidationTextField
                    name = 'fullName'
                    sx={styleTextField}
                    required
                    id="outlined-required"
                    // label="Tên"
                    defaultValue={user?.fullName}
                  />
                  <Box sx={{ mt:2 }}>Email*</Box>
                  <TextField
                    name = 'email'
                    sx={styleTextFieldDisable}
                    disabled
                    id="outlined-required"
                    // label="Tên"
                    value={user?.email}
                  />
                  <Box sx={{ mt:2 }}>Mật khẩu*</Box>
                  <Box>
                    <TextField
                      type='password'
                      name = 'password'
                      sx={styleTextFieldDisable}
                      disabled
                      id="outlined-required"
                      // label="Tên"
                      value={user?.password}
                    />
                    { isToggle
                      ? <Box sx={{ display:'flex', mt:1 }}>
                        <Box sx={{ width:'48%', mr:3 }}>
                        Mật khẩu mới
                          <TextField
                            type={showPassword ? 'text' : 'password'}
                            sx={styleTextField}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton onClick={togglePasswordVisibility} size='small'>
                                    {showPassword ? <VisibilityOffIcon sx={{ color: '#394867' }} /> : <Visibility sx={{ color: '#394867' }} />}
                                  </IconButton>
                                </InputAdornment>
                              )
                            }}
                          />
                        </Box>
                        <Box sx={{ width:'48%' }}>
                        Nhập lại mật khẩu
                          <TextField
                            type={showCfPassword ? 'text' : 'password'}
                            sx={styleTextField}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton onClick={togglePasswordVisibilityCf} size='small'>
                                    {showCfPassword ? <VisibilityOffIcon sx={{ color: '#394867' }} /> : <Visibility sx={{ color: '#394867' }} />}
                                  </IconButton>
                                </InputAdornment>
                              )
                            }}
                          />
                        </Box>
                      </Box>
                      : <></> }
                    <Box sx={{ width:'20%', mt:1 }}>
                      <Button component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        sx={styleButton}
                        onClick={() => setIsToggle(!isToggle)}
                      >
                        <Box sx={{ fontSize:12, minWidth:'fit-content' }}>Đổi mật khẩu</Box>
                      </Button>
                    </Box>
                    <Box sx={{ height:'100%', mt:1 }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                          components={[
                            'DatePicker',
                            'TimePicker',
                            'DateTimePicker',
                            'DateRangePicker'
                          ]}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              'height' : '60px',
                              'color' : 'white',
                              fontSize: '0,5rem',
                              '& fieldset': { borderWidth: '0.5px !important', borderColor: '#454D6A !important' },
                              '&:hover fieldset': { borderWidth: '2px !important', borderColor: '#87A922 !important' },
                              '&:disabled fieldset' : { color:'#454D6A' },
                              '&.Mui-focused fieldset': { borderWidth: '2px !important', borderColor: '#454D6A' }
                            }
                          }}
                        >
                          <DemoItem label={<Label componentName="DatePicker" valueType="release" />}>
                            <DatePicker sx={{ '& .MuiIconButton-root' : { color:'white' } }} name='date' value={dayjs(convertDate.convert(user.dob))}/>
                          </DemoItem>
                        </DemoContainer>
                      </LocalizationProvider>
                    </Box>
                    <Box sx={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <Button
                        type='submit'
                        sx={{
                          alignItems:'center',
                          justifyContent:'center',
                          width: '20%',
                          height: '35px',
                          borderRadius: '5px',
                          color: 'white',
                          background: 'linear-gradient(180deg, #72be43, #F0FF42)',
                          textAlign: 'center',
                          cursor: 'pointer',
                          fontSize: '13px',
                          ':hover': {
                            opacity: 0.7
                          },
                          mt:2
                        }}> Cập nhật</Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </form>
          </Box>
        </div>
      </Box>
      <Footer />
    </Container>
  )
}
export default Profile