import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Toolbar from '@mui/material/Toolbar'
import Deposits from '~/admin/components/Deposits'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'
import { DateRange } from 'react-date-range'
import { format } from 'date-fns'
import { useRef } from 'react'
import { getAllMovieAPI } from '~/apis/movieApi'
import { getListBranchAPI } from '~/apis/branchApi'
import { Search } from '@mui/icons-material'
import { toast } from 'react-toastify'
import { convertStringToDate } from '../utils/convertStringToDate'
import { getListBillStatisticIdAPI } from '~/apis/billApi'
import DataBillStatistic from '../components/DataBillStatistic'

function DashBoard() {
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
  const [range, setRange] = useState([{
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  }])
  const [isOpen, setIsOpen] = useState(false)
  const refCalen = useRef(null)
  const [film, setFilm] = useState('')
  const [listMovie, setListMovie] = useState([])
  const [listBranch, setListBranch] = useState([])
  const [branch, setBranch] = useState({})
  const [listBill, setListBill] = useState(null)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    document.addEventListener('click', handleClickOver, true)
    document.addEventListener('keydown', handleClickESC, true)
  }, [])

  // useEffect(() => {
  //   console.log(range)
  // }, [range])

  useEffect(() => {
    getAllMovieAPI().then(res => setListMovie(res))
    getListBranchAPI().then(res => setListBranch(res))
  }, [])

  const handleClickOver = (event) => {

    if (refCalen.current && !refCalen.current.contains(event.target)) {
      setIsOpen(false)
    }
  }
  const handleClickESC = (event) => {
    if (event.key === 'Escape') {
      setIsOpen(true)
    }
  }

  const handleChangeFilm = (event) => {
    setFilm(event.target.value)
  }
  const handleChangeBranch = (event) => {
    setBranch(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const data = {
      'startDate': convertStringToDate(range[0].startDate.toString()),
      'endDate': convertStringToDate(range[0].endDate.toString()),
      'movieId': parseInt(formData.get('film')),
      'branchId': parseInt(formData.get('branch'))
    }
    if (!data.movieId) data.movieId = null
    if (!data.branchId) data.branchId = null
    // console.log('🚀 ~ handleSubmit ~ data:', data)
    // console.log('🚀 ~ handleSubmit ~ start:', convertStringToDate(range[0].startDate.toString()))
    // console.log('🚀 ~ handleSubmit ~ start:', convertStringToDate(range[0].endDate.toString()))
    try {
      // console.log('🚀 ~ handleSubmit ~ res:', res)
      getListBillStatisticIdAPI(data).then(res => {
        // console.log('🚀 ~ getListBillStatisticIdAPI ~ res:', res)
        setOpen(true)
        setListBill(res)
      })
    } catch (err) {
      toast.error(err.message)
    }
  }
  return (
    <Box
      component="main"
      sx={{
        backgroundColor: '#1a1d29',
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto'
      }}
    >
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, bgcolor: '#1a1d29' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
            <form onSubmit={handleSubmit}>
              <Box sx={{ display:'flex' }}>
                <TextField
                  value={`${format(range[0].startDate, 'dd-MM-yyyy')} - ${format(range[0].endDate, 'dd-MM-yyyy')}`}
                  onClick={() => setIsOpen(true)}
                  sx={{ color: 'white',
                    '& .MuiInputBase-input': {
                      color: 'white' // Màu chữ của input
                    },
                    '& .MuiOutlinedInput-root': {
                      borderColor: 'white' // Màu viền
                    },
                    '& .MuiInputLabel-root': {
                      color: 'white' // Màu label
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white' // Màu viền nổi
                    },
                    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#87A922' // Màu viền khi hover
                    } }}
                />
                <FormControl
                  sx={{ ml:2, width:'30%',
                    minWidth: 120,
                    color:'white',
                    '& .MuiInputBase-root': {
                      color: 'white'
                    },
                    '& .MuiInputLabel-root': {
                      color: 'white'
                    },
                    '& .MuiSvgIcon-root': {
                      color: 'white'
                    },
                    '& .MuiOutlinedInput-root': {
                      '&:hover': {
                        borderColor: '#87A922' // Màu viền khi hover
                      },
                      '&.Mui-focused': {
                        borderColor: 'white' // Màu viền khi được focus
                      }
                    },
                    '& .MuiInputBase-input': {
                      color: 'white',
                      '&:hover': {
                        borderColor: '#87A922'
                      }
                    },
                    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#87A922' // Màu viền khi hover
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white'
                    } }} >
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
                    <MenuItem key={'filmTmp'} value={''}>Tất cả</MenuItem>
                    {listMovie?.map((item, index) => {
                      return <MenuItem key={`film${index}`} value={item.id}>{item.name}</MenuItem>
                    })}
                  </Select>
                </FormControl>
                <FormControl sx={{ ml:2, width:'30%',
                  minWidth: 120,
                  color:'white',
                  '& .MuiInputBase-root': {
                    color: 'white'
                  },
                  '& .MuiInputLabel-root': {
                    color: 'white'
                  },
                  '& .MuiSvgIcon-root': {
                    color: 'white'
                  },
                  '& .MuiOutlinedInput-root': {
                    '&:hover': {
                      borderColor: '#87A922' // Màu viền khi hover
                    },
                    '&.Mui-focused': {
                      borderColor: 'white' // Màu viền khi được focus
                    }
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                    '&:hover': {
                      borderColor: '#87A922'
                    }
                  },
                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#87A922' // Màu viền khi hover
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white'
                  } }}>
                  <InputLabel id="demo-simple-select-label1">Branch</InputLabel>
                  <Select
                    labelId="demo-simple-select-label1"
                    id="demo-simple-select"
                    label="Branch"
                    onChange={handleChangeBranch}
                    sx={{ mr: '15px' }}
                    name='branch'
                  >
                    <MenuItem key={'branchTmp'} value={''}>Tất cả</MenuItem>
                    {listBranch.map((item, index) => {
                      return <MenuItem key={`branch${index}`} value={item.id}>{item.name}</MenuItem>
                    })}
                  </Select>
                </FormControl>
              </Box>
              <div ref={refCalen} >
                {isOpen && (
                  <DateRange
                    onChange={(item) => {
                      setRange([item.selection])
                    }}
                    editableDateInputs={true}
                    moveRangeOnFirstSelection={false}
                    ranges={range}
                    months={1}
                    direction='horizontal'
                  />
                )}
              </div>
              <Box sx={{ width: '100%', display:'flex', alignItems:'center', justifyContent:'center', mt:'10px' }}>
                <Button type='submit' sx={{ bgcolor:'green', height:'70%', width:'10%', color:'white', ':hover' : { bgcolor:'#87A922' }, fontSize:'12px', borderRadius:'2px solid black' }}>Start<Search fontSize='small'/></Button>
              </Box>
            </form>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240
              }}
            >
              <Deposits listBill={listBill} />
            </Paper>
          </Grid>
          { open && <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', color: 'white' }}>
              <DataBillStatistic listBill={listBill} />
            </Paper>
          </Grid>
          }
        </Grid>
        {/* <Copyright sx={{ pt: 4 }} /> */}
      </Container>
    </Box>
  )
}

export default DashBoard