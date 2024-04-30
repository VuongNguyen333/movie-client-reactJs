/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-imports */
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Tooltip from '@mui/material/Tooltip'
import Stack from '@mui/material/Stack'
import SendIcon from '@mui/icons-material/Send'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import { CardActionArea } from '@mui/material'
import { styled } from '@mui/material/styles'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { validateBeforeSubmit } from '../utils/validateBeforeSubmit'
import { JoiObjectFilm } from '../utils/FilmModel'
import { convertDate } from '../utils/convertDate'
import { getMovieByIdAPI } from '~/apis/movieApi'
import dayjs from 'dayjs'

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

function UpdateFilmForm({ open, onClose, itemId, handleUpdate }) {
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
      padding: '4px !important'
    }
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
    photo: {},
    fileName: ''
  }
  const [film, setFilm] = useState(null)
  const languages = ['Subtitle', 'Dubbing']
  const genres = ['Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery', 'Romance', 'Science Fiction', 'Thriller', 'War', 'Western']
  const [language, setLanguage] = React.useState('')
  const [category, setCategory] = React.useState('')
  const [releaseDate, setReleaseDate] = React.useState('')
  const [photo, setPhoto] = React.useState({})
  const [fileName, setFileName] = useState('')
  const [formDataInit, setFormDataInit] = useState(initFormData)
  useEffect(() => {
    getMovieByIdAPI(itemId).then(res => {
      setFilm(res)
      setReleaseDate(res.releaseDate)
      setLanguage(res.language)
      setCategory(res.category)
      setFormDataInit({
        name : res.name,
        actor: res.actor,
        director: res.director,
        duration: res.duration,
        trailerURL: res.trailerURL,
        description: res.description,
        language: res.language,
        category: res.category
      })
    })
  }, [itemId])

  const handleUpdateFilm = (data) => {
    setFilm(data)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormDataInit((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    // Kiểm tra định dạng email
    const data = {
      'id' : film.id,
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
    // console.log('🚀 ~ handleSubmit ~ data:', data)
    await validateBeforeSubmit(JoiObjectFilm, data, null, null, handleUpdate, handleUpdateFilm)
    // console.log('🚀 ~ handleSubmit ~ data:', data)
    // Call Api
  }


  // Hàm xử lý sự kiện khi người dùng chọn tệp
  const handleFileInputChange = (event) => {
    const file = event.target.files[0] // Lấy ra tệp được chọn
    setPhoto(file)
    setFileName(file.name) // Cập nhật tên của tệp vào trạng thái
  }
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: '5px' }}>
          Update film
        </Typography>
        <form onSubmit={handleSubmit} style={{ display:'flex' }}>
          <Box sx={{ mr:'10px' }}>
            <Card sx={{ minWidth: 200 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  width='200'
                  height="350"
                  image={film ? `data:image/jpeg;base64,${film.photo}` : ''}
                  alt='avatar'
                />
              </CardActionArea>
            </Card>
          </Box>
          <Box>
            <TextField InputLabelProps={{ shrink: true }} name='name' label="Name" required variant="outlined" value={formDataInit?.name} onChange={handleChange} id="validation-outlined-input" sx={{ mb: '10px', width: '100%' }} />
            <TextField InputLabelProps={{ shrink: true }} name='actor' label="Actor" required variant="outlined" value={formDataInit?.actor} onChange={handleChange} id="validation-outlined-input" sx={{ mb: '10px', width: '100%' }} />
            <TextField InputLabelProps={{ shrink: true }} name='director' label="Director" required variant="outlined" value={formDataInit?.director} onChange={handleChange} id="validation-outlined-input" sx={{ mb: '10px', width: '100%' }} />
            <TextField InputLabelProps={{ shrink: true }} name='trailerURL' label="TrailerURL" required variant="outlined" value={formDataInit?.trailerURL} onChange={handleChange} id="validation-outlined-input" sx={{ mb: '10px', width: '100%' }} />
            <TextField InputLabelProps={{ shrink: true }} name='description' label="Description" required variant="outlined" value={formDataInit?.description} onChange={handleChange} id="validation-outlined-input" sx={{ mb: '10px', width: '100%' }} multiline />
            <TextField InputLabelProps={{ shrink: true }} name='duration' multiline label="Duration (minute)" required variant="outlined" value={formDataInit?.duration} onChange={handleChange} id="validation-outlined-input" sx={{ mb: '10px', width: '100%' }} />
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
                components={[
                  'DatePicker',
                  'TimePicker',
                  'DateTimePicker',
                  'DateRangePicker'
                ]}
                sx={{ mb: '5px' }}
              >
                <DemoItem label={<Label componentName="DatePicker" valueType="release" />}>
                  <DatePicker name='date' value={dayjs(convertDate.convert(releaseDate))} />
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
            Update
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  )
}

export default UpdateFilmForm