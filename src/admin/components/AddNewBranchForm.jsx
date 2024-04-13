/* eslint-disable no-restricted-imports */
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Tooltip from '@mui/material/Tooltip'
import Stack from '@mui/material/Stack'
import SendIcon from '@mui/icons-material/Send'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import AddIcon from '@mui/icons-material/Add'
import { validateBeforeSubmit } from '~/admin/utils/validateBeforeSubmit'
import { JoiObjectBranchAddNew, JoiObjectBranchUpdate } from '../utils/BranchModel'
import { areas } from '~/mock_data'
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

function AddNewBranchForm() {
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
    photo : {}
  }
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [fileName, setFileName] = useState('')
  const [photo, setPhoto] = useState({})
  const [formDataInit, setFormDataInit] = useState(initFormData)

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
      'photo' : photo
    }
    await validateBeforeSubmit( JoiObjectBranchAddNew, data, handleSetFormData )
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
                  return <MenuItem key={`area${index}`} value={item?.name}>{item?.name}</MenuItem>
                })}
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