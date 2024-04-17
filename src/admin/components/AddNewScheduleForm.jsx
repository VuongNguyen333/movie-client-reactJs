/* eslint-disable no-restricted-imports */
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import SendIcon from '@mui/icons-material/Send'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import AddIcon from '@mui/icons-material/Add'
import { styled } from '@mui/material/styles'
import { validateBeforeSubmit } from '~/admin/utils/validateBeforeSubmit'
import { areas, productData, roomOfBranchThuDuc } from '~/mock_data'
import { CircularProgress } from '@mui/material'

function AddNewScheduleForm({ open, onClose, formData }) {
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
  const [film, setFilm] = useState('')
  const [room, setRoom] = useState('')
  const [formDataReq, setFormDataReq] = useState({})
  useEffect(() => {
    setFormDataReq(formData)
    console.log('🚀 ~ useEffect ~ formData:', formData)
    setFilm(productData.find(item => item.id.toString() === formData?.movieId?.toString()))
    setRoom(roomOfBranchThuDuc.find(item => item.id.toString() === formData?.roomId?.toString()))
  }, [formData, formDataReq])
  const handleSubmit = async (event) => {
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
          Update Customer
        </Typography>
        <form onSubmit={handleSubmit} style={{ display:'flex' }}>
          <Box>
            <ValidationTextField disabled name='name' label="Film" required variant="outlined" defaultValue={film ? film?.name : ''} id="validation-outlined-input" sx={{ mb: '10px', width: '100%' }} />
            <ValidationTextField disabled name='address' multiline label="Room" required variant="outlined" defaultValue={room ? room?.name : ''} id="validation-outlined-input" sx={{ mb: '10px', width: '100%' }} />
            <Button sx={{ bgcolor:'green', ':hover': { bgcolor:'#90D26D' } }} variant="contained" endIcon={<SendIcon />} type='submit'>
            Update
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  )
}

export default AddNewScheduleForm