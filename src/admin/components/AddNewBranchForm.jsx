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
import { validateBeforeSubmit, validateBeforeSubmitBranch } from '~/admin/utils/validateBeforeSubmit'
import { JoiObjectBranchAddNew } from '../utils/BranchModel'
import { addNewBranchAPI } from '~/apis/branchApi'
import { getListAreaAPI } from '~/apis/areaApi'

function AddNewBranchForm({ handleAddNew }) {
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
  const initFormData = {
    name : '',
    address : '',
    introduction : '',
    area : '',
    status: false,
    photo : {}
  }
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [fileName, setFileName] = useState('')
  const [photo, setPhoto] = useState({})
  const [formDataInit, setFormDataInit] = useState(initFormData)
  const [areas, setAreas] = useState([])
  useEffect(() => {
    getListAreaAPI().then(res => setAreas(res))
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormDataInit((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }
  const handleFileInputChange = (event) => {
    const file = event.target.files[0] // Lấy ra tệp được chọn
    setPhoto(file)
    setFileName(file.name) // Cập nhật tên của tệp vào trạng thái
  }

  const handleSetFormData = () => {
    setFormDataInit(initFormData)
    setFileName('')
    setPhoto({})
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    // Kiểm tra định dạng email
    const data = {
      'name': formData.get('name'),
      'address': formData.get('address'),
      'introduction': formData.get('introduction'),
      'area' : formData.get('area'),
      'status': formData.get('status'),
      'photo' : photo
    }
    // console.log('🚀 ~ handleSubmit ~ data:', data)
    await validateBeforeSubmitBranch( JoiObjectBranchAddNew, data, handleSetFormData, handleAddNew, null, null )

  }

  return (
    <div>
      <Box typography='h4' sx={{ alignItems: 'center', justifyContent: 'center' }}>
        <Button onClick={handleOpen} variant="outlined" startIcon={<AddIcon />}>Add new Branch</Button>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add new branch
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField value={formDataInit.name} onChange={handleChange} name='name' label="Name" required variant="outlined" id="validation-outlined-input" sx={{ mb: '10px', width: '100%' }} />
            <TextField value={formDataInit.address} onChange={handleChange} name='address' label="Address" required variant="outlined" id="validation-outlined-input" sx={{ mb: '10px', width: '100%' }} />
            <TextField value={formDataInit.introduction} onChange={handleChange} name='introduction' label="Introduction" required variant="outlined" id="validation-outlined-input" sx={{ mb: '10px', width: '100%' }} />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Area</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formDataInit.area}
                label="Area"
                onChange={handleChange}
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
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formDataInit.status}
                label="Status"
                onChange={handleChange}
                sx={{ mb: '10px' }}
                name='status'
              >
                <MenuItem value={true}>Active</MenuItem>
                <MenuItem value={false}>InActive</MenuItem>
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
            Upload image film
              <VisuallyHiddenInput name='photo' type="file" onChange={handleFileInputChange} />
            </Button>
            <p>{fileName}</p>
            <Button sx={{ bgcolor:'green', ':hover': { bgcolor:'#90D26D' } }} variant="contained" endIcon={<SendIcon />} type='submit'>
            Update
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

export default AddNewBranchForm