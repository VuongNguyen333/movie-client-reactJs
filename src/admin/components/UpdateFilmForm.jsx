/* eslint-disable no-restricted-imports */
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Tooltip from '@mui/material/Tooltip'
import Stack from '@mui/material/Stack'
import SendIcon from '@mui/icons-material/Send'
import { styled } from '@mui/material/styles'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { productData } from '~/mock_data'
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
      borderColor: 'red',
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

  const handleChangeLanguage = (event) => {
    setLanguage(event.target.value)
  }
  const handleChangeCategory = (event) => {
    setCategory(event.target.value)
  }
  function convert(input) {
    const parts = input.split('/') // Tách chuỗi thành các thành phần ngày, tháng và năm
    const day = parts[0] // Lấy ngày từ chuỗi
    const month = parts[1] // Lấy tháng từ chuỗi
    const year = parts[2] // Lấy năm từ chuỗi
    const res = `${year}-${month}-${day}`
    return res
  }
  function convertToRequest(input) {
    const parts = input.split('/') // Tách chuỗi thành các thành phần ngày, tháng và năm
    const day = parts[0] // Lấy ngày từ chuỗi
    const month = parts[1] // Lấy tháng từ chuỗi
    const year = parts[2] // Lấy năm từ chuỗi
    const res = `${year}/${month}/${day}`
    return res
  }

  const handleSubmit = (event) => {
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
      'releaseDate': convertToRequest(formData.get('date')),
      'photo': formData.get('photo'),
    }
    console.log('🚀 ~ handleSubmit ~ data:', data)
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
        <form onSubmit={handleSubmit}>
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
                <DatePicker name='date' defaultValue={dayjs(convert(film ? film.releaseDate : ''))} />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload image film
            <VisuallyHiddenInput name='photo' type="file" />
          </Button>
          <Button variant="contained" endIcon={<SendIcon />} type='submit'>
            Send
          </Button>
        </form>
      </Box>
    </Modal>
  )
}

export default UpdateFilmForm