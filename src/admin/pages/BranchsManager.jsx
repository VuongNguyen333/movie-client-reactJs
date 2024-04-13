import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import { branchs } from '~/mock_data'
import DataTable from '../components/DataTable'
import ViewAndUpdateButton from '../components/ViewAndUpdateButton'
import AddNewBranchForm from '../components/AddNewBranchForm'

const columns = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'name', headerName: 'Name', width: 200, editable: true },
  {
    field: 'address',
    headerName: 'Address',
    width: 600,
    editable: true
  },
  { field: 'introduction', headerName: 'Introduction', width: 150, editable: true },
  {
    field: 'areaResponse',
    headerName: 'Area',
    width: 100,
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
        <ViewAndUpdateButton params={params} type='branch'/>
      )
    },
    disableColumnMenu: true,
    sortable: false
  }
]

function BranchsManager() {
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
        <Box typography='h3' sx={{ alignItems: 'center', justifyContent: 'center' }}>List Branchs</Box>
      </Box>
      <AddNewBranchForm />
      <DataTable rows={branchs} columns={columns} />
    </Box>
  )
}

export default BranchsManager