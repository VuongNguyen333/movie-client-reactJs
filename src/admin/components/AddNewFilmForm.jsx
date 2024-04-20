/* eslint-disable no-restricted-imports */
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Tooltip from '@mui/material/Tooltip'
import Stack from '@mui/material/Stack'
import SendIcon from '@mui/icons-material/Send'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { validateBeforeSubmit } from '../utils/validateBeforeSubmit'
import { JoiObjectFilmAddNew } from '../utils/FilmModel'
import { convertDate } from '../utils/convertDate'
import dayjs from 'dayjs'
import { addNewMovieAPI } from '~/apis/movieApi'

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
      <Box >Release Date</Box>
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

function AddNewForm({ handleAddNew }) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 700,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
    maxHeight: '90%',
    overflowY: 'auto',
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
    actor : '',
    director : '',
    trailerURL : '',
    description : '',
    duration: '',
    language: '',
    category: '',
    releaseDate: '',
    photo: {}
  }

  const [formDataInit, setFormDataInit] = useState(initFormData)
  const [photo, setPhoto] = useState({})
  const [fileName, setFileName] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormDataInit((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSetFormData = () => {
    setFormDataInit(initFormData)
    setPhoto({})
    setFileName('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    // Kiểm tra định dạng email
    const data = {
      'name': formData.get('name'),
      'actor': formData.get('actor'),
      'director': formData.get('director'),
      'trailerURL': formData.get('trailerURL'),
      'description': formData.get('description'),
      'duration': formData.get('duration'),
      'language': formData.get('language'),
      'category': formData.get('category'),
      'releaseDate': convertDate.convertToRequest(formData.get('date')),
      'photo': photo
    }
    console.log('🚀 ~ handleSubmit ~ data:', data)
    await validateBeforeSubmit(JoiObjectFilmAddNew, data, handleSetFormData, handleAddNew, null, null)
  }

  const handleFileInputChange = (event) => {
    const file = event.target.files[0] // Lấy ra tệp được chọn
    setPhoto(file)
    setFileName(file.name)
  }

  const languages = ['Subtitle', 'Dubbing']
  const genres = ['Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery', 'Romance', 'Science Fiction', 'Thriller', 'War', 'Western']
  return (
    <div>
      <Box typography='h4' sx={{ alignItems: 'center', justifyContent: 'center' }}>
        <Button onClick={handleOpen} variant="outlined" startIcon={<AddIcon />}>Add new film</Button>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add new film
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField value={formDataInit.name} onChange={handleChange} name='name' label="Name" required variant="outlined" id="validation-outlined-input" sx={{ mb: '10px', width: '100%' }} />
            <TextField value={formDataInit.actor} onChange={handleChange} name='actor' label="Actor" required variant="outlined" id="validation-outlined-input" sx={{ mb: '10px', width: '100%' }} />
            <TextField value={formDataInit.director} onChange={handleChange} name='director' label="Director" required variant="outlined" id="validation-outlined-input" sx={{ mb: '10px', width: '100%' }} />
            <TextField value={formDataInit.trailerURL} onChange={handleChange} name='trailerURL' label="TrailerURL" required variant="outlined" id="validation-outlined-input" sx={{ mb: '10px', width: '100%' }} />
            <TextField value={formDataInit.description} onChange={handleChange} name='description' label="Description" required variant="outlined" id="validation-outlined-input" sx={{ mb: '10px', width: '100%' }} multiline />
            <TextField value={formDataInit.duration} onChange={handleChange} name='duration' multiline label="Duration (minute)" required variant="outlined" id="validation-outlined-input" sx={{ mb: '10px', width: '100%' }} />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Language</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formDataInit.language}
                label="Language"
                onChange={handleChange}
                sx={{ mb: '10px' }}
                name='language'
              >
                {languages.map((item, index) => {
                  return <MenuItem key={`languages${index}`} value={item}>{item}</MenuItem>
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formDataInit.category}
                label="Category"
                name='category'
                onChange={handleChange}
                sx={{ mb: '5px' }}
              >
                {genres.map((item, index) => {
                  return <MenuItem key={`category${index}`} value={item}>{item}</MenuItem>
                })}
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                required
                components={[
                  'DatePicker',
                  'TimePicker',
                  'DateTimePicker',
                  'DateRangePicker'
                ]}
                sx={{ mb: '5px' }}
              >
                <DemoItem required label={<Label componentName="DatePicker" valueType="release" />}>
                  <DatePicker required name='date' />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
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
            Add
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

export default AddNewForm