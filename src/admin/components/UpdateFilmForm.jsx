/* eslint-disable no-restricted-imports */
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import React, { useState } from 'react'
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
import { productData } from '~/mock_data'
import dayjs from 'dayjs'
import { validateBeforeSubmit } from '../utils/validateBeforeSubmit'
import { JoiObjectFilm } from '../utils/FilmModel'
import { convertDate } from '../utils/convertDate'

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

function UpdateFilmForm({ open, onClose, itemId }) {
  const film = productData.find(item => item.id.toString() === itemId.toString())
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
      padding: '4px !important' // override inline-style
    }
  })
  const languages = ['Phụ đề', 'Vietnamese']
  const genres = ['Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery', 'Romance', 'Science Fiction', 'Thriller', 'War', 'Western']
  const [language, setLanguage] = React.useState(film ? film.language : 'Phụ đề')
  const [category, setCategory] = React.useState(film ? film.category : 'Action')
  const [photo, setPhoto] = React.useState({})

  const handleChangeLanguage = (event) => {
    setLanguage(event.target.value)
  }
  const handleChangeCategory = (event) => {
    setCategory(event.target.value)
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
    await validateBeforeSubmit(JoiObjectFilm, data)
    console.log('🚀 ~ handleSubmit ~ data:', data)
    // Call Api
  }

  const [fileName, setFileName] = useState('')

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
            <ValidationTextField name='name' label="Name" required variant="outlined" defaultValue={film ? film.name : ''} id="validation-outlined-input" sx={{ mb: '10px', width: '100%' }} />
            <ValidationTextField name='actor' label="Actor" required variant="outlined" defaultValue={film ? film.actor : ''} id="validation-outlined-input" sx={{ mb: '10px', width: '100%' }} />
            <ValidationTextField name='director' label="Director" required variant="outlined" defaultValue={film ? film.director : ''} id="validation-outlined-input" sx={{ mb: '10px', width: '100%' }} />
            <ValidationTextField name='trailerURL' label="TrailerURL" required variant="outlined" defaultValue={film ? film.trailerURL : ''} id="validation-outlined-input" sx={{ mb: '10px', width: '100%' }} />
            <ValidationTextField name='description' label="Description" required variant="outlined" defaultValue={film ? film.description : ''} id="validation-outlined-input" sx={{ mb: '10px', width: '100%' }} multiline />
            <ValidationTextField name='duration' multiline label="Duration (minute)" required variant="outlined" defaultValue={film ? film.duration : ''} id="validation-outlined-input" sx={{ mb: '10px', width: '100%' }} />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Language</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={language}
                label="Language"
                onChange={handleChangeLanguage}
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
                value={category}
                label="Category"
                name='category'
                onChange={handleChangeCategory}
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
                  <DatePicker name='date' defaultValue={dayjs(convertDate.convert(film ? film.releaseDate : ''))} />
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