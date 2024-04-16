/* eslint-disable no-console */
import Box from '@mui/material/Box'
import { branchs, roomOfBranchThuDuc } from '~/mock_data'
import Toolbar from '@mui/material/Toolbar'
import DataTable from '../components/DataTable'
import { useLocation } from 'react-router-dom'
import ViewAndUpdateButtonRoom from '../components/ViewAndUpdateButtonRoom'
import AddNewRoomForm from '../components/AddNewRoomForm'

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Name', width: 150, editable: true },
  {
    field: 'status',
    headerName: 'Status',
    width: 150,
    editable: true,
    valueGetter: (params) => {
      return params.toString() ? 'Active' : 'UnActive'
    }
  },
  {
    field: 'branchResponse',
    headerName: 'Branch',
    width: 300,
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
  let data = {}
  let branch = {}
  if (location.state) {
    data = roomOfBranchThuDuc
    console.log('🚀 ~ RoomsManager ~ data:', data)
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
        <Box typography='h4' sx={{ alignItems: 'center', justifyContent: 'center', mt:'3px' }}>{branch.name.toUpperCase()}</Box>
      </Box>
      <AddNewRoomForm branchId={branch?.id} />
      <DataTable rows={data} columns={columns} />
    </Box>
  )
}

export default RoomsManager