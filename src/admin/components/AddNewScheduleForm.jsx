/* eslint-disable no-restricted-imports */
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import SendIcon from '@mui/icons-material/Send'
import { styled } from '@mui/material/styles'
import { CircularProgress, Stack, Tooltip } from '@mui/material'
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { convertDate } from '../utils/convertDate'
import { getMovieByIdAPI } from '~/apis/movieApi'
import { getRoomByIdAPI } from '~/apis/roomApi'
import { addNewScheduleByMovieIdAndRoomIdAPI } from '~/apis/scheduleApi'
import { toast } from 'react-toastify'

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
      <Box >Start Date</Box>
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
function AddNewScheduleForm({ open, onClose, formData, handleAddNew }) {
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


  const [film, setFilm] = useState('')
  const [room, setRoom] = useState(formData ? formData.roomId : '')
  useEffect(() => {
    // Call Api get Film and Room
    getMovieByIdAPI(formData.movieId).then(res => setFilm(res))
    getRoomByIdAPI(formData.roomId).then(res => setRoom(res))
  }, [formData?.roomId, formData])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    const time = data.get('time').split(' ')[0]
    const dataReq = {
      'startDate' : convertDate.convertToRequest(formData.startDate),
      'startTime' : time,
      'movieId' : parseInt(formData.movieId),
      'roomId' : formData.roomId
    }
    // console.log('🚀 ~ handleSubmit ~ dataReq:', dataReq)
    try {
      addNewScheduleByMovieIdAndRoomIdAPI(dataReq).then(res => handleAddNew(res))
    } catch (err) {
      toast.error(err.message)
    }
    // Call Api
  }
  if (!formData) {
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
          Create Schedule
        </Typography>
        <form onSubmit={handleSubmit} style={{ display:'flex' }}>
          <Box>
            <ValidationTextField disabled name='name' label="Film" required variant="outlined" defaultValue={film ? film?.name : ''} id="validation-outlined-input" sx={{ mb: '10px', width: '100%' }} />
            <ValidationTextField disabled name='address' multiline label="Room" required variant="outlined" defaultValue={room ? room?.name : ''} id="validation-outlined-input" sx={{ mb: '10px', width: '100%' }} />
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
                  <DatePicker disabled name='date' defaultValue={dayjs((formData ? formData.startDate : ''))} />
                </DemoItem>
                <DemoItem label="Responsive variant">
                  <TimePicker ampm={false} name='time' />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
            <Button sx={{ bgcolor:'green', ':hover': { bgcolor:'#90D26D' } }} variant="contained" endIcon={<SendIcon />} type='submit'>
            Create
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  )
}

export default AddNewScheduleForm