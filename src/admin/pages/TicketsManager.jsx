/* eslint-disable no-console */
import Box from '@mui/material/Box'
import { ticketBillId10 } from '~/mock_data'
import Toolbar from '@mui/material/Toolbar'
import DataTable from '../components/DataTable'

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'price', headerName: 'Price', width: 100 },
  {
    field: 'seatResponse',
    headerName: 'Seat',
    width: 200,
    valueGetter: (params) => {
      return `${params.name} (Room ${params.roomResponse?.name})`
    }
  },
  {
    field: 'scheduleResponse',
    headerName: 'Schedule',
    width: 200,
    valueGetter: (params) => {
      return `${params.startTime} (${params.startDate})`
    }
  },
  {
    field: 'scheduleResponse.movieResponse',
    headerName: 'Schedule',
    width: 200,
    valueGetter: (params) => {
      return `${params.name})`
    }
  }
]
function TicketsManager() {
  const data = ticketBillId10
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
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box typography='h4' sx={{ alignItems: 'center', justifyContent: 'center' }}>LIST TICKETS</Box>
      </Box>
      {/* <Box sx={{ height:'fit-content', display:'flex' }}>
        <Box sx={{ mr:'30px' }}>
          <Box sx={{ ml:'5px', fontSize:15 }}>Film: {schedule.movieResponse.name}</Box>
          <Box sx={{ ml:'5px', fontSize:15 }}>Room: {schedule.roomResponse.name}</Box>
        </Box>
        <Box>
          <Box sx={{ ml:'5px', fontSize:15 }}>Branch: {schedule.roomResponse.branchResponse.name}</Box>
          <Box sx={{ ml:'5px', fontSize:15 }}>Time: {schedule.startTime.toString() + ' ' + schedule.startDate}</Box>
        </Box>
      </Box> */}
      <DataTable rows={data} columns={columns} />
    </Box>
  )
}

export default TicketsManager