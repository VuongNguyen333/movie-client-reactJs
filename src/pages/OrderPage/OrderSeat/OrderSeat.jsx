import * as React from 'react'
import ToggleButton from '@mui/material/ToggleButton'
import Box from '@mui/material/Box'
import ChairIcon from '@mui/icons-material/Chair'
import { styled } from '@mui/material/styles'
import ToggleButtonGroup, {
  toggleButtonGroupClasses
} from '@mui/material/ToggleButtonGroup'
import './OrderSeat.css'
import { branchs, schedules } from '~/mock_data'
import seats from '~/mock_data'

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

export default function OrderSeat({ branchId, scheduleId }) {
  const branch = branchs.find(item => item.branch_id.toString() === branchId.toString())
  const schedule = schedules.find(item => item.schedule_id.toString() === scheduleId.toString())
  const [formats, setFormats] = React.useState(() => [''])
  const [total, setTotal] = React.useState(0)
  const handleFormat = (event, newFormats) => {
    setFormats(newFormats)
    let sum = 0
    console.log('🚀 ~ handleFormat ~ newFormats:', newFormats)
    newFormats.map(item => {
      if (item) {
        sum += seats[item].price
      }
    })
    setTotal(sum)
    // setTotal(total + rows[])
  }
  const rowA = seats.filter(seat => seat.name.startsWith('A'))
  const rowB = seats.filter(seat => seat.name.startsWith('B'))
  const rowC = seats.filter(seat => seat.name.startsWith('C'))
  const rowD = seats.filter(seat => seat.name.startsWith('D'))
  const rows = [rowA, rowB, rowC, rowD]
  return (
    <Box sx={{ }}>
      <Box sx={{ color: 'white', display: 'flex', alignItems: 'center' }}>
        <Box>
          <h3>{branch.name}</h3>
          <Box>{schedule.start_time}</Box>
        </Box>
      </Box>
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
          { rows.map((row, index) => {
            return <Box key={index} sx={{ display: 'flex', alignItems:'center', justifyContent:'center', color: 'white' }}>
              <Box>{row[0].name[0]}</Box>
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
                { row.map((seat, index1) => {
                  return !seat.isOrder ? <ToggleButton key={`seat${index1}`} value={seat.seatId} >
                    <ChairIcon fontSize='large' sx={{ color: formats.includes((index) * 6 + index1+1) ? '#16FF00' : seat.isOrder ? '#A0153E' : (seat.name.startsWith('C') || seat.name.startsWith('D')) ? 'purple' : 'gray' }}/>
                  </ToggleButton> : <ToggleButton key={`seat${index1}`} value={seat.seatId} disabled >
                    <ChairIcon fontSize='large' sx={{ color:  '#A0153E' }}/>
                  </ToggleButton>
                } ) }
              </StyledToggleButtonGroup>
            </Box>
          }) }
        </Box>
      </Box>
      <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', mt:'20px' }}>
        <Box sx={{ color: 'white', alignItems:'center', justifyContent:'center' }}>Tổng hóa đơn: {total}</Box>
      </Box>
    </Box>
  )
}
