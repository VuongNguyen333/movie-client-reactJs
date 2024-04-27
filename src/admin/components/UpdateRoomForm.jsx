/* eslint-disable no-restricted-imports */
import { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import SendIcon from '@mui/icons-material/Send'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CircularProgress from '@mui/material/CircularProgress'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { CardActionArea } from '@mui/material'
import { validateBeforeSubmitRoom } from '~/admin/utils/validateBeforeSubmit'
import { JoiObjectRoomUpdate } from '../utils/RoomModel'
import { getRoomByIdAPI } from '~/apis/roomApi'

function UpdateRoomForm({ open, onClose, roomId, handleUpdate }) {
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
  const initFormData = {
    name : '',
    status : null,
    photo : {}
  }
  const [room, setRoom] = useState({})
  const [fileName, setFileName] = useState('')
  const [photo, setPhoto] = useState({})
  const [formDataInit, setFormDataInit] = useState(initFormData)
  const [status, setStatus] = useState(null)
  useEffect (() => {
    //Call Api get branch
    getRoomByIdAPI(roomId).then(res => {
      setRoom(res)
      setStatus(res.status)
    })
  }, [roomId])
  const handleChange = (event) => {
    const { name, value } = event.target
    setFormDataInit((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }
  const handleUpdateRoom = (data) => {
    setRoom(data)
  }
  const handleFileInputChange = (event) => {
    const file = event.target.files[0] // Lấy ra tệp được chọn
    setPhoto(file)
    setFileName(file.name) // Cập nhật tên của tệp vào trạng thái
  }
  const handleChangeStatus = (event) => {
    setStatus(event.target.value)
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    // Kiểm tra định dạng email
    const data = {
      'id': room.id,
      'name': formData.get('name'),
      'status' : formData.get('status'),
      'photo' : photo
    }
    console.log('🚀 ~ handleSubmit ~ data:', data)
    // call api
    await validateBeforeSubmitRoom(JoiObjectRoomUpdate, null, data, null, null, handleUpdate, handleUpdateRoom)
  }
  if (!room) {
    return <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2,
      width: '100vh',
      height: '100vh'
    }}>
      <CircularProgress />
      <Typography>Loading data...</Typography>
    </Box>
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ minWidth: 200 }}
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: '5px' }}>
          Update Room
        </Typography>
        <form onSubmit={handleSubmit} style={{ display:'flex' }}>
          <Box sx={{ mr:'10px' }}>
            <Card sx={{ minWidth:100 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  width='200'
                  height="300px"
                  image={room ? `data:image/jpeg;base64,${room.photo}` : ''}
                  alt='avatar'
                />
              </CardActionArea>
            </Card>
          </Box>
          <Box>
            <TextField InputLabelProps={{ shrink: true }} name='name' label="Name" required variant="outlined" value={room ? room?.name : ''} id="validation-outlined-input" sx={{ mb: '10px', width: '100%' }} />
            <FormControl fullWidth >
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                autoFocus
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                onChange={handleChangeStatus}
                sx={{ mb: '10px' }}
                name='status'
              >
                <MenuItem value={true}>Active</MenuItem>
                <MenuItem value={false}>UnActive</MenuItem>
              </Select>
            </FormControl>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              sx={{ mr:'10px' }}
            >
            Upload Image
              <VisuallyHiddenInput name='photo' type="file" onChange={handleFileInputChange} />
            </Button>
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

export default UpdateRoomForm