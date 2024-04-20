import * as React from 'react'
import ToggleButton from '@mui/material/ToggleButton'
import Box from '@mui/material/Box'
import ChairIcon from '@mui/icons-material/Chair'
import { useParams } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import ToggleButtonGroup, {
  toggleButtonGroupClasses
} from '@mui/material/ToggleButtonGroup'
import './OrderSeat.css'
import { useEffect } from 'react'
import { getMovieByIdAPI } from '~/apis/movieApi'
import { useState } from 'react'
import { getBranchbyIdAPI } from '~/apis/branchApi'
import { getScheduleByIdAPI } from '~/apis/scheduleApi'
import { getListSeatAPI } from '~/apis/seat'

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    margin: theme.spacing(0.5),
    border: 0,
    borderRadius: theme.shape.borderRadius,
    [`&.${toggleButtonGroupClasses.disabled}`]: {
      border: 0
    }
  },
  [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]:
    {
      marginLeft: -1,
      borderLeft: '1px solid transparent'
    }
}))

export default function OrderSeat({ branchId, scheduleId, orderSeat }) {
  const { filmId, filmName } = useParams()
  const [film, setFilm] = useState({})
  const [branch, setBranch] = useState({})
  const [schedule, setSchedule] = useState({})
  const [seats, setSeat] = useState([])
  const [rows, setRows] = useState([])
  const [isSeatsLoaded, setIsSeatsLoaded] = useState(false)
  useEffect(() => {
    if (!isSeatsLoaded) {
      getMovieByIdAPI(filmId).then(res => {
        setFilm(res)
      })
      getBranchbyIdAPI(branchId).then(res => {
        setBranch(res)
      })
      getScheduleByIdAPI(scheduleId).then(res => {
        setSchedule(res)
      })
      getListSeatAPI(scheduleId).then(res => {
        setSeat(res)
        const rowA = res?.filter(seat => seat.seatResponse.name.startsWith('A'))
        const rowB = res?.filter(seat => seat.seatResponse.name.startsWith('B'))
        const rowC = res?.filter(seat => seat.seatResponse.name.startsWith('C'))
        const rowD = res?.filter(seat => seat.seatResponse.name.startsWith('D'))
        setRows([rowA, rowB, rowC, rowD])
        setIsSeatsLoaded(true)
      })
    }
  }, [filmId, branchId, scheduleId, isSeatsLoaded])
  const [formats, setFormats] = React.useState(() => [''])
  const [total, setTotal] = React.useState(0)
  const handleFormat = (event, newFormats) => {
    setFormats(newFormats)
    console.log('🚀 ~ handleFormat ~ newFormats:', newFormats)
    let sum = 0
    // console.log('🚀 ~ handleFormat ~ newFormats:', newFormats)
    newFormats.map(item => {
      if (item) {
        sum += seats?.[item].price
      }
    })
    setTotal(sum)
    orderSeat(newFormats, sum, seats)
  }
  return (
    <Box sx={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
      <Box sx={{ alignItems:'center', justifyContent:'center' }}>
        <img style={{ width: '250px', borderRadius: '10px', height:'350px' }} src={`data:image/jpeg;base64,${film?.photo}`} alt="product image" />
        <Box sx={{ alignItems:'center', justifyContent:'center', border:'1px solid white', p:'5px', borderRadius:'10px', maxWidth:300 }} >
          <Box sx={{ alignItems:'center', justifyContent:'center', border:'1px solid white', p:'5px', borderRadius:'10px', color:'white' }}>
            <Box sx={{ alignItems:'center', justifyContent:'center', typography:'h5', borderBottom:'1px solid white', color:'#16FF00', width:'100%' }} >{filmName}</Box>
            <Box sx={{ typography:'h5', width:' 100%' }}>{branch?.name}</Box>
            <Box sx={{ width:' 100%' }}>{schedule ? `${schedule?.startTime?.toString() + ' ' + schedule?.startDate+ ' Room: ' + schedule?.roomResponse?.name}` : ''}</Box>
            { total!==0 && <Box sx={{ color: 'white', borderTop:'1px solid white', width:' 100%' }}>Tổng hóa đơn: {total}.000</Box> }
          </Box>
        </Box>
      </Box>

      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '50px' }}>
          <div className='container'>
            <div style={{ marginTop: '0px', alignItems: 'center', justifyContent: 'center' }}>Screen</div>
            <div className="moon"></div>
          </div>
        </Box>
        <Box sx={{ display: 'flex', alignItems:'center', justifyContent:'center' }}>
          <Box sx={{ margin: '10px' }}>
            <Box sx={{ color:'white' }}>
              <ToggleButton value='selected Seat' disabled >
                <ChairIcon fontSize='large' sx={{ color:  '#16FF00' }}/>
              </ToggleButton>
              Selected Seat
            </Box>
            <Box sx={{ color:'white' }}>
              <ToggleButton value='sold' disabled >
                <ChairIcon fontSize='large' sx={{ color:  '#A0153E' }}/>
              </ToggleButton>
              Sold
            </Box>
          </Box>
          <Box>
            <Box sx={{ color:'white' }}>
              <ToggleButton value='-VIP-ES' disabled >
                <ChairIcon fontSize='large' sx={{ color:  'purple' }}/>
              </ToggleButton>
              -VIP-ES
            </Box>
            <Box sx={{ color:'white' }}>
              <ToggleButton value='selected Seat' disabled >
                <ChairIcon fontSize='large' sx={{ color:  'gray' }}/>
              </ToggleButton>
              -Stand-
            </Box>
          </Box>
        </Box>
        <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Box sx={{ alignItems:'center', justifyContent:'center' }}>
            { rows?.map((row, index) => {
              return <Box key={index} sx={{ display: 'flex', alignItems:'center', justifyContent:'center', color: 'white' }}>
                <Box>{row[0]?.seatResponse?.name[0]}</Box>
                <StyledToggleButtonGroup
                  size="small"
                  value={formats}
                  onChange={handleFormat}
                  aria-label="text formatting"
                  sx={{
                    '&.MuiToggleButtonGroup-root': {
                      '& .MuiToggleButton-root.Mui-selected': { }
                    }
                  }}
                >
                  { row?.map((seat, index1) => {
                    return !seat.ordered ? <ToggleButton key={`seat${index1}`} value={(index) * 6 + index1} >
                      <ChairIcon
                        fontSize='large'
                        sx={{
                          color: formats.includes((index) * 6 + index1)
                            ?'#16FF00'
                            : seat.ordered ? '#A0153E'
                              : (seat.seatResponse.name.startsWith('B') || seat.seatResponse.name.startsWith('C')) ?'purple'
                                : 'gray'
                        }}
                      />
                    </ToggleButton> : <ToggleButton key={`seat${index1}`} value={(index) * 6 + index1} disabled >
                      <ChairIcon fontSize='large' sx={{ color:  '#A0153E' }}/>
                    </ToggleButton>
                  } ) }
                </StyledToggleButtonGroup>
              </Box>
            }) }
          </Box>
        </Box>
      </Box>
      <Box></Box>
    </Box>
  )
}
