/* eslint-disable no-console */
import Box from '@mui/material/Box'
import { branchs, roomOfBranchThuDuc } from '~/mock_data'
import Toolbar from '@mui/material/Toolbar'
import DataTable from '../components/DataTable'
import { useLocation } from 'react-router-dom'
import ViewAndUpdateButtonRoom from '../components/ViewAndUpdateButtonRoom'
import AddNewRoomForm from '../components/AddNewRoomForm'

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 100, editable: true },
  { field: 'status', headerName: 'Status', width: 100, editable: true },
  {
    field: 'branchResponse',
    headerName: 'Branch',
    width: 200,
    editable: true,
    valueGetter: (params) => {
      return params.name
    }
  },
  {
    field: 'button',
    headerName: 'Action',
    width: 100,
    renderCell: (params) => {
      return (
        <ViewAndUpdateButtonRoom params={params} type='schedule'/>
      )
    },
    disableColumnMenu: true,
    sortable: false
  }
]
function RoomsManager() {
  const location = useLocation()
  console.log('🚀 ~ SchedulesManager ~ location:', location)
  let data = {}
  let branch = {}
  if (location.state) {
    data = roomOfBranchThuDuc
    branch = branchs.find(item => location.state.branchId.toString() === item.id.toString())
  } else {
    data = {}
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
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box typography='h4' sx={{ alignItems: 'center', justifyContent: 'center' }}>List room branch {branch.name}</Box>
      </Box>
      <AddNewRoomForm branchId={branch?.id} />
      <DataTable rows={data} columns={columns} />
    </Box>
  )
}

export default RoomsManager