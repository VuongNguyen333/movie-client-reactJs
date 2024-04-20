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
import { getAllMovieAPI } from '~/apis/movieApi'
import { getListBranchAPI } from '~/apis/branchApi'

export default function AddNewSchedule() {
  const [date, setDate] = useState('')
  const [film, setFilm] = useState('')
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
    console.log('🚀 ~ handleSubmit ~ data:', data)
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
      const res = await validate(JoiObjectScheduleSearch, data)
      console.log('🚀 ~ handleSubmit ~ res:', res)
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
          <Box sx={{ display:'flex', gap:1, fontSize:18, mb:'8px', alignItems:'center', width:'100%' }}>
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
              <Box sx={{ width:'40%', alignItems:'center' }}>
                <FormControl fullWidth sx={{ }}>
                  <InputLabel id="demo-simple-select-label">Film</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Film"
                    onChange={handleChangeFilm}
                    sx={{}}
                    name='film'
                  >
                    {listMovie?.map((item, index) => {
                      return <MenuItem key={`film${index}`} value={item.id}>{item.name}</MenuItem>
                    })}
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display:'flex', gap:1, fontSize:18, mb:'8px', alignItems:'center' }}>
            <Box sx={{ width:'90px' }}>Branch:</Box>
            <Box sx={{ width: '30%', display:'flex', alignItems:'center' }}>
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
              <Button type='submit' sx={{ bgcolor:'green', height:'70%', width:'40%', color:'white', ':hover' : { bgcolor:'#87A922' }, fontSize:'12px' }}>Search<SearchIcon fontSize='small'/></Button>
            </Box>
          </Box>
        </form>
      </Box>
      {open && <DataTableScheduleOfRoom data={formDataReq} branchId={branch}/>}
    </Box>
  )
}

// chon ngay, chon phim