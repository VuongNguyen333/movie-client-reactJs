/* eslint-disable no-restricted-imports */
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Tooltip from '@mui/material/Tooltip'
import Stack from '@mui/material/Stack'
import SendIcon from '@mui/icons-material/Send'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { styled } from '@mui/material/styles'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { CardActionArea } from '@mui/material'
import { validateBeforeSubmit, validateBeforeSubmitUser } from '~/admin/utils/validateBeforeSubmit'
import { JoiObjectUser } from '~/admin/utils/UserModel'
import { convertDate } from '../utils/convertDate'
import { users } from '~/mock_data'
import convertToListRole from '~/admin/utils/convertToListRole'
import { getListRoleAPI } from '~/apis/roleApi'
import { getUserByIdAPI } from '~/apis/userApi'

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

function UpdateCustomerForm({ open, onClose, userId, handleUpdate }) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 650,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
    maxHeight: '90%',
    overflowY: 'auto',
    overflowX: 'auto',
    minWidth: 150
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
      padding: '4px !important' // override inline-style
    }
  })
  const [roles, setRoles] = useState([])
  const [user, setUser] = useState({})
  const [fileName, setFileName] = useState('')
  const [devices, setDevices] = useState (convertToListRole(user?.roles))
  const [photo, setPhoto] = useState({})
  useEffect(() => {
    getListRoleAPI().then(res => {
      setRoles(res)
    })
    getUserByIdAPI(userId).then(res => {
      setUser(res)
      const newDevices = convertToListRole(res?.roles)
      setDevices(newDevices)
    })
  }, [userId])

  const handleDevices = (event, newDevices) => {
    if (newDevices.length) {
      setDevices(newDevices)
    }
  }
  const handleUpdateCustomer = (data) => {
    setUser(data)
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    // Kiểm tra định dạng email
    const data = {
      'id': userId,
      'fullName': formData.get('fullName'),
      'email': formData.get('email'),
      'dob': convertDate.convertToRequest(user?.dob),
      'avatar': photo,
      'rolesId' : devices
    }
    console.log('🚀 ~ handleSubmit ~ data:', data)
    await validateBeforeSubmitUser(JoiObjectUser, data, handleUpdate, handleUpdateCustomer)
    // Call Api
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ minWidth: 100 }}
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: '5px' }}>
          Update Customer
        </Typography>
        <form onSubmit={handleSubmit} style={{ display:'flex' }}>
          <Box sx={{ mr:'10px' }}>
            <Card sx={{ minWidth:200 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  width='200'
                  height="300px"
                  image={user ? `data:image/jpeg;base64,${user?.avatar}` : ''}
                  alt='avatar'
                />
              </CardActionArea>
            </Card>
          </Box>
          <Box sx={{ }}>
            <ValidationTextField disabled name='fullName' label="Full Name" required variant="outlined" defaultValue={user ? user?.fullName : ''} id="validation-outlined-input" sx={{ mb: '10px', width:'100%' }} />
            <ValidationTextField disabled name='email' label="Email" required variant="outlined" defaultValue={user ? user?.email :''} id="validation-outlined-input" sx={{ mb: '10px', width:'100%' }} />
            <ToggleButtonGroup
              sx={{ display:'flex' }}
              name='roles'
              color="primary"
              value={devices}
              onChange={handleDevices}
              aria-label="Platform"
            >
              { roles.map(item => <ToggleButton sx={{ fontSize:'small', font:10 }} key={`${item.id}`} value={item?.id}>{item?.name}</ToggleButton>) }
            </ToggleButtonGroup>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={[
                  'DatePicker',
                  'TimePicker',
                  'DateTimePicker',
                  'DateRangePicker'
                ]}
                sx={{ mb: '5px' }}
              >
                <DemoItem label={<Label componentName="DatePicker" valueType="release" />}>
                  <DatePicker disabled name='date' defaultValue={dayjs(convertDate.convert(user ? user.dob : ''))}/>
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
            <p style={{ maxWidth:200 }}>{fileName}</p>
            <Button sx={{ bgcolor:'green', ':hover': { bgcolor:'#90D26D' } }} variant="contained" endIcon={<SendIcon />} type='submit'>
            Update
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  )
}

export default UpdateCustomerForm