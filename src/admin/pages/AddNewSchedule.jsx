/* eslint-disable no-restricted-imports */
import { Button, FormControl, InputLabel, MenuItem, Select, Toolbar } from '@mui/material'
import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import SearchIcon from '@mui/icons-material/Search'
import { validate } from '../utils/validateBeforeSubmit'
import { JoiObjectScheduleSearch } from '../utils/ScheduleModel'
import { toast } from 'react-toastify'
import DataTableScheduleOfRoom from '../components/DataTableScheduleOfRoom'
import { getAllMovieAPI, getMovieByIdAPI } from '~/apis/movieApi'
import { getListBranchAPI } from '~/apis/branchApi'

export default function AddNewSchedule() {
  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  }

  const [date, setDate] = useState('')
  const [film, setFilm] = useState('')
  const [movie, setMovie] = useState(null)
  const [listMovie, setListMovie] = useState([])
  const [listBranch, setListBranch] = useState([])
  const [branch, setBranch] = useState({})
  const [open, setOpen] = useState(false)

  useEffect(() => {
    getAllMovieAPI().then(res => setListMovie(res))
    getListBranchAPI().then(res => setListBranch(res))
  }, [])

  const initFormData = {
    startDate: '',
    movieId: 0,
    branchId: '',
    roomId: ''
  }

  const [formDataReq, setFormDataReq] = useState(initFormData)
  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const data = {
      'startDate': (formData.get('date')),
      'movieId': parseInt(formData.get('film')),
      'branchId': parseInt(formData.get('branch'))
    }
    // console.log('🚀 ~ handleSubmit ~ data:', data)
    setFormDataReq({
      'startDate': data.startDate,
      'movieId' : data.movieId,
      'startTime' : '',
      'roomId' : ''
    })
    setDate(data.startDate)
    setFilm(data.movieId)
    setBranch(data.branchId)
    try {
      await validate(JoiObjectScheduleSearch, data)
      getMovieByIdAPI(data.movieId).then(res => setMovie(res))
      // console.log('🚀 ~ handleSubmit ~ res:', res)
      setOpen(true)
    } catch (err) {
      toast.error(err.message)
    }
  }

  const handleChangeFilm = (event) => {
    setFilm(event.target.value)
  }
  const handleChangeBranch = (event) => {
    setBranch(event.target.value)
  }
  return (
    <Box
      component="main"
      sx={{
        // display:'flex',
        color: 'black',
        bgcolor: 'white',
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
      }}>
      <Toolbar />
      <Box>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display:'flex', gap:1, fontSize:18, mb:'8px', alignItems:'center', width:'100%', justifyContent:'center' }}>
            <Box sx={{ display:'flex', alignItems:'center', mr:'10px' }}>
              <Box sx={{ width:'100px' }}>Pick Date:</Box>
              <Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    required
                    components={[
                      'DatePicker',
                      'TimePicker',
                      'DateTimePicker',
                      'DateRangePicker'
                    ]}
                    sx={{ mb: '5px', minWidth:'30%' }}
                  >
                    <DatePicker required name='date' />
                  </DemoContainer>
                </LocalizationProvider>
              </Box>
            </Box>
            <Box sx={{ display:'flex', width:'100%', alignItems:'center' }}>
              <Box sx={{ width:'60px' }}>Film:</Box>
              <Box sx={{ width:'100%', alignItems:'center' }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Film</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Film"
                    onChange={handleChangeFilm}
                    sx={{ }}
                    name='film'
                    MenuProps={MenuProps}
                  >
                    {listMovie?.map((item, index) => {
                      return <MenuItem key={`film${index}`} value={item.id}>{item.name}</MenuItem>
                    })}
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box sx={{ display:'flex', width:'100%', alignItems:'center' }}>
              <Box sx={{ width:'90px' }}>Branch:</Box>
              <FormControl fullWidth sx={{ minWidth:'30%' }}>
                <InputLabel id="demo-simple-select-label1">Branch</InputLabel>
                <Select
                  labelId="demo-simple-select-label1"
                  id="demo-simple-select"
                  label="Branch"
                  onChange={handleChangeBranch}
                  sx={{ mr: '15px' }}
                  name='branch'
                >
                  {listBranch.map((item, index) => {
                    return <MenuItem key={`branch${index}`} value={item.id}>{item.name}</MenuItem>
                  })}
                </Select>
              </FormControl>
            </Box>
          </Box>
          { movie &&
                <Box sx={{ display:'flex', ml:'10px', alignItems:'center', justifyContent:'center' }}>
                  <Box>Duration:  </Box>
                  <Box> {Math.floor(movie.duration / 60) + ' Hour ' + movie.duration % 60 + ' Minute '} </Box>
                </Box>
          }
          <Box sx={{ width: '100%', display:'flex', alignItems:'center', justifyContent:'center', mt:'10px' }}>
            <Button type='submit' sx={{ bgcolor:'green', height:'70%', width:'10%', color:'white', ':hover' : { bgcolor:'#87A922' }, fontSize:'12px', borderRadius:'2px solid black' }}>Search<SearchIcon fontSize='small'/></Button>
          </Box>
        </form>
      </Box>
      {open && <DataTableScheduleOfRoom data={formDataReq} branchId={branch}/>}
    </Box>
  )
}

// chon ngay, chon phim