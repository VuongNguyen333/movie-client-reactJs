/* eslint-disable no-restricted-imports */
import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
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
import { getScheduleByIdAPI } from '~/apis/scheduleApi'
import { validateBeforeSubmitSchedule } from '../utils/validateBeforeSubmit'
import { JoiObjectScheduleUpdate } from '../utils/ScheduleModel'

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
function UpdateScheduleForm({ open, onClose, scheduleId, handleUpdate }) {
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


  const [schedule, setSchedule] = useState({})
  const [startTime, setStartTime] = useState('')
  const [startDate, setStartDate] = useState('')

  useEffect(() => {
    getScheduleByIdAPI(scheduleId).then(res => {
      setSchedule(res)
      setStartDate(res.startDate)
      setStartTime(res.startTime)
      console.log('🚀 ~ getScheduleByIdAPI ~ res:', res)
    })
  }, [scheduleId])

  const handleUpdateSchedule = (data) => {
    setSchedule(data)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    const formData = {
      id: scheduleId,
      startTime : data.get('time').split(' ')[0],
      startDate : convertDate.convertToRequest(data.get('date'))
    }
    console.log('🚀 ~ handleSubmit ~ formData:', formData)
    validateBeforeSubmitSchedule(JoiObjectScheduleUpdate, formData, handleUpdate, handleUpdateSchedule)
    // Call Api
  }

  if (!schedule) {
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
          Update Schedule
        </Typography>
        <form onSubmit={handleSubmit} style={{ display:'flex' }}>
          <Box>
            <TextField InputLabelProps={{ shrink: true }} disabled name='film' label="Film" required variant="outlined" value={schedule ? schedule?.movieResponse?.name : ''} id="validation-outlined-input" sx={{ mb: '10px', width: '100%' }} />
            <TextField InputLabelProps={{ shrink: true }} disabled name='room' multiline label="Room" required variant="outlined" value={schedule ? schedule?.roomResponse?.name : ''} id="validation-outlined-input" sx={{ mb: '10px', width: '100%' }} />
            <TextField InputLabelProps={{ shrink: true }} disabled name='branch' multiline label="Branch" required variant="outlined" value={schedule ? schedule?.roomResponse?.branchResponse?.name : ''} id="validation-outlined-input" sx={{ mb: '10px', width: '100%' }} />
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
                  <DatePicker name='date' value={dayjs(convertDate.convert(startDate))} />
                </DemoItem>
                <DemoItem label="Start Time">
                  <TimePicker ampm={false} name='time' value={dayjs(startTime, 'HH:mm')} />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
            <Button sx={{ bgcolor:'green', ':hover': { bgcolor:'#90D26D' } }} variant="contained" endIcon={<SendIcon />} type='submit'>
            Update
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  )
}

export default UpdateScheduleForm