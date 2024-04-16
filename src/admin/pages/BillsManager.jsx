/* eslint-disable no-console */
import Box from '@mui/material/Box'
import { billScheduleId111, branchs, roomOfBranchThuDuc, schedules } from '~/mock_data'
import Toolbar from '@mui/material/Toolbar'
import DataTable from '../components/DataTable'
import { useLocation, useParams } from 'react-router-dom'
import AddNewRoomForm from '../components/AddNewRoomForm'
import ViewButtonBill from '../components/ViewButtonBill'
import DataTableBill from '../components/DataTableBill'

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'createdDate', headerName: 'Createed Date', width: 100, editable: true },
  { field: 'createdTime', headerName: 'Createed Time', width: 100, editable: true },
  { field: 'payment', headerName: 'Payment', width: 100, editable: true },
  { field: 'numberOfTickets', headerName: 'Ticket Sold', width: 100, editable: true },
  {
    field: 'userResponse',
    headerName: 'Customer',
    width: 200,
    editable: true,
    valueGetter: (params) => {
      return params.fullName
    }
  },
  {
    field: 'button',
    headerName: 'Action',
    width: 100,
    renderCell: (params) => {
      return (
        <ViewButtonBill params={params}/>
      )
    },
    disableColumnMenu: true,
    sortable: false
  }
]
function BillsManager() {
  const { scheduleId } = useParams()
  console.log('🚀 ~ BillsManager ~ scheduleId:', scheduleId)
  const data = billScheduleId111
  const schedule = [...schedules].find(item => item.id.toString() === scheduleId.toString())
  console.log('🚀 ~ BillsManager ~ schedule:', schedule)
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
        <Box typography='h4' sx={{ alignItems: 'center', justifyContent: 'center' }}>LIST BILLS</Box>
      </Box>
      <Box sx={{ height:'fit-content', display:'flex' }}>
        <Box sx={{ mr:'30px' }}>
          <Box sx={{ ml:'5px', fontSize:15 }}>Film: {schedule?.movieResponse.name}</Box>
          <Box sx={{ ml:'5px', fontSize:15 }}>Room: {schedule?.roomResponse.name}</Box>
        </Box>
        <Box>
          <Box sx={{ ml:'5px', fontSize:15 }}>Branch: {schedule?.roomResponse.branchResponse.name}</Box>
          <Box sx={{ ml:'5px', fontSize:15 }}>Time Schedule: {schedule?.startTime.toString() + ' ' + schedule?.startDate}</Box>
        </Box>
      </Box>
      {/* <DataTable rows={data} columns={columns} /> */}
      <DataTableBill />
    </Box>
  )
}

export default BillsManager