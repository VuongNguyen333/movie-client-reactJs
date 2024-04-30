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
import { CardActionArea, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { validateBeforeSubmitBranch } from '~/admin/utils/validateBeforeSubmit'
import { JoiObjectBranchUpdate } from '../utils/BranchModel'
import { getBranchbyIdAPI } from '~/apis/branchApi'
import { getListAreaAPI } from '~/apis/areaApi'

function UpdateBranchForm({ open, onClose, branchId, handleUpdate }) {
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

  const [branch, setBranch] = useState({})
  const [fileName, setFileName] = useState('')
  const [photo, setPhoto] = useState({})
  const [status, setStatus] = useState(null)
  const [areas, setAreas] = useState([])
  const [area, setArea] = useState(null)
  useEffect (() => {
    //Call Api get branch
    getBranchbyIdAPI(branchId).then(res => {
      setBranch(res)
      setStatus(res.status)
      setArea(res.areaResponse.id)
    })
    getListAreaAPI().then(res => setAreas(res))
  }, [branchId])
  const handleFileInputChange = (event) => {
    const file = event.target.files[0] // Lấy ra tệp được chọn
    setPhoto(file)
    setFileName(file.name) // Cập nhật tên của tệp vào trạng thái
  }
  const handleUpdateBranch = (data) => {
    setBranch(data)
  }
  const handleChangeStatus = (event) => {
    setStatus(event.target.value)
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    // Kiểm tra định dạng email
    const data = {
      'id': branch.id,
      'name': formData.get('name'),
      'address': formData.get('address'),
      'introduction': formData.get('introduction'),
      'area' : formData.get('area'),
      'status' : formData.get('status'),
      'photo' : photo
    }
    // console.log('🚀 ~ handleSubmit ~ data:', data)
    await validateBeforeSubmitBranch(JoiObjectBranchUpdate, data, null, null, handleUpdate, handleUpdateBranch)
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
            <TextField InputLabelProps={{ shrink: true }} name='name' label="Name" required variant="outlined" defaultValue={branch ? branch?.name : ''} id="validation-outlined-input" sx={{ mb: '10px', width: '100%' }} />
            <TextField InputLabelProps={{ shrink: true }} name='address' multiline label="Address" required variant="outlined" defaultValue={branch ? branch?.address : ''} id="validation-outlined-input" sx={{ mb: '10px', width: '100%' }} />
            <TextField InputLabelProps={{ shrink: true }} name='introduction' label="Introduction" required variant="outlined" defaultValue={branch ? branch?.introduction : ''} id="validation-outlined-input" sx={{ mb: '10px', width: '100%' }} />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Area</InputLabel>
              <Select
                disabled
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={branch?.areaResponse?.id}
                value={area}
                label="Area"
                sx={{ mb: '10px' }}
                name='area'
              >
                {areas.map((item, index) => {
                  return <MenuItem key={`area${index}`} value={item?.id}>{item?.name}</MenuItem>
                })}
              </Select>
            </FormControl>
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