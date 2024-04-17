/* eslint-disable no-restricted-imports */
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import SendIcon from '@mui/icons-material/Send'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CircularProgress from '@mui/material/CircularProgress'
import { CardActionArea } from '@mui/material'
import { validateBeforeSubmit } from '~/admin/utils/validateBeforeSubmit'
import { JoiObjectBranchUpdate } from '../utils/BranchModel'
import { branchs } from '~/mock_data'

function UpdateBranchForm({ open, onClose, branchId }) {
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
  const [branch, setBranch] = useState({})
  const [fileName, setFileName] = useState('')
  const [photo, setPhoto] = useState({})
  useEffect (() => {
    //Call Api get branch
    const newBranch = branchs.find(item => item.id.toString() === branchId.toString())
    setBranch(newBranch)
  }, [branchId])
  const handleFileInputChange = (event) => {
    const file = event.target.files[0] // Lấy ra tệp được chọn
    setPhoto(file)
    setFileName(file.name) // Cập nhật tên của tệp vào trạng thái
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    // Kiểm tra định dạng email
    const data = {
      'name': formData.get('name'),
      'address': formData.get('address'),
      'introduction': formData.get('introduction'),
      'areaId' : formData.get('introduction'),
      'photo' : photo
    }
    await validateBeforeSubmit(JoiObjectBranchUpdate, data)
    setFileName('')
    setPhoto({})
    onClose
    // Call Api
  }
  if (!branch) {
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
          Update Branch
        </Typography>
        <form onSubmit={handleSubmit} style={{ display:'flex' }}>
          <Box sx={{ mr:'10px' }}>
            <Card sx={{ minWidth:100 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  width='200'
                  height="300px"
                  image={branch ? `data:image/jpeg;base64,${branch.photo}` : ''}
                  alt='avatar'
                />
              </CardActionArea>
            </Card>
          </Box>
          <Box>
            <ValidationTextField name='name' label="Name" required variant="outlined" defaultValue={branch ? branch?.name : ''} id="validation-outlined-input" sx={{ mb: '10px', width: '100%' }} />
            <ValidationTextField name='address' multiline label="Address" required variant="outlined" defaultValue={branch ? branch?.address : ''} id="validation-outlined-input" sx={{ mb: '10px', width: '100%' }} />
            <ValidationTextField name='introduction' label="Introduction" required variant="outlined" defaultValue={branch ? branch?.introduction : ''} id="validation-outlined-input" sx={{ mb: '10px', width: '100%' }} />
            <ValidationTextField name='area' label="Area" required variant="outlined" defaultValue={branch ? branch?.areaResponse?.name : ''} id="validation-outlined-input" sx={{ mb: '10px', width: '100%' }} />
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              sx={{ mr:'10px' }}
            >
            Upload avatar
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

export default UpdateBranchForm