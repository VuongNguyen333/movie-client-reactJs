/* eslint-disable no-restricted-imports */
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Container from '@mui/material/Container'
import CircularProgress from '@mui/material/CircularProgress'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import styled from '@emotion/styled'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useEffect, useState } from 'react'
import { getUserByIdAPI, updateUserClientByIdAPI } from '~/apis/userApi'
import { Visibility } from '@mui/icons-material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'
import { convertDate } from '~/admin/utils/convertDate'
import { convertFile } from '~/admin/utils/fileToBob'
import { resetPasswordAPI } from '~/apis/auth'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'
import Footer from '~/components/Footer'
import Navbar from '~/components/NavBar/NavBar'
import { useNavigate } from 'react-router-dom'
import BillOfUserDetails from '~/components/BIllOfUser/BillOfUserDetails'
import { formatNumber } from '~/utils/formatVnd'
import { objectToJson } from '~/utils/objectToJson'
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

  const [user, setUser] = useState(null)
  const [avatar, setAvatar] = useState('')
  const [photo, setPhoto] = useState({})
  const [fileName, setFileName] = useState('')
  const [isToggle, setIsToggle] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showCfPassword, setShowCfPassword] = useState(false)
  const [resetPass, setResetPass] = useState(false)
  const [name, setName] = useState('')
  const userId = localStorage.getItem('userId')
  const navigate = useNavigate()
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const togglePasswordVisibilityCf = () => {
    setShowCfPassword(!showCfPassword)
  }
  useEffect(() => {
    if (!userId) navigate('/login', { replace:true })
    if (localStorage.getItem('user')) {
      const userLocal = JSON.parse(localStorage.getItem('user'))
      setUser(userLocal)
      setAvatar(userLocal.avatar)
      setName(userLocal.fullName)
    }
    getUserByIdAPI(userId)
      .then(res => {
        setUser(res)
        setAvatar(res.avatar)
        setName(res.fullName)
      })
  }, [userId])
  const handleFileInputChange = (event) => {
    const file = event.target.files[0]
    setPhoto(file)
    setFileName(file.name)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const data = {
      'fullName': formData.get('fullName'),
      'dob': convertDate.convertToRequest(formData.get('date')),
      'photo': photo
    }
    const pass = formData.get('password')
    const cfPass = formData.get('confirmPassword')
    if (pass) {
      if (pass === cfPass) {
        resetPasswordAPI ({ email: user.email, password: pass })
        try {
          const file = await convertFile(data.photo)
          data.photo = file
        } catch (error) {
          data.photo = new File([], 'empty_file.txt', { type: 'text/plain' })
        }
        updateUserClientByIdAPI(data, user.id).then(res => {
          setAvatar(res.avatar)
          setUser(res)
          setFileName('')
        })
      }
      else toast.error('Mật khẩu không khớp nhau. Vui lòng nhập lại.')
    }
    else {
      try {
        const file = await convertFile(data.photo)
        data.photo = file
      } catch (error) {
        data.photo = new File([], 'empty_file.txt', { type: 'text/plain' })
      }
      updateUserClientByIdAPI(data, user.id).then(res => {
        setAvatar(res.avatar)
        setUser(res)
        setFileName('')
        setResetPass(false)
      })
    }
  }

  if (!user) {
    return (
      <Box sx={{
        color: 'white',
        bgcolor:'#1a1d29',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        height:'100vh'
      }}>
        <CircularProgress />
        <Typography>Loading data...</Typography>
      </Box>
    )
  }
  return (
    <Container maxWidth={false} sx={{ bgcolor:'#222831', height:'100vh' }} disableGutters>
      <Container disableGutters maxWidth={false} sx={{ bgcolor:'#1a1d29' }}>
        <Navbar avatar={avatar} fullName={name}/>
        <Box sx={{ bgcolor:'#1a1d29' }}>
          <Box sx={{ color:'#1a1d29' }}>1</Box>
          <Box sx={{ color:'#1a1d29' }}>1</Box>
          <Box sx={{ color:'#1a1d29' }}>1</Box>
          <div style={{ bgcolor:'#1a1d29', color:'white' }}>
            <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', typography:'h5', fontWeight:'bold', mb:'30px' }}>Tài khoản</Box>
            <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
              <form onSubmit={handleSubmit}>
                <Box sx={{ border:'2px solid #454D6A', borderRadius:'8px', width:'50%', padding:2, minWidth:'fit-content', mb:3 }}>
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
                    Tổng chi tiêu: {<Typography sx={{ ml:1, color:'#87A922' }} >{formatNumber(user?.totalPayment)}.000đ</Typography>}
                      </Box>
                      <Typography fontStyle='italic' sx={{ fontSize:13, color:'#CCC' }}>Vui lòng đăng ảnh chân dung, thấy rõ mặt có kích thước: ngang 200 pixel và dọc 200 pixel (dung lượng dưới 1MB)</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ border:'1px solid #9BA4B5', mb:2 }}></Box>
                  <Box>
                    <Box>Tên*</Box>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      name = 'fullName'
                      sx={styleTextField}
                      required
                      variant="outlined"
                      id="validation-outlined-input"
                      // label="Tên"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
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
                        value='1111111111'
                      />
                      { isToggle
                        ? <Box sx={{ display:'flex', mt:1 }}>
                          <Box sx={{ width:'48%', mr:3 }}>
                        Mật khẩu mới
                            <TextField
                              name='password'
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
                              name = 'confirmPassword'
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
        <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', bgcolor:'#1a1d29' }}>
          <Box sx={{ bgcolor:'#1a1d29', color:'white', typography:'h4', mb:2 }}>
          Lịch sử đặt vé
          </Box>
        </Box>
        <BillOfUserDetails userId={userId}/>
        <Footer />
      </Container>
    </Container>

  )
}
export default Profile