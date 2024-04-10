import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import { productData } from '~/mock_data'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import PreviewIcon from '@mui/icons-material/Preview'
import BuildIcon from '@mui/icons-material/Build'
import AddIcon from '@mui/icons-material/Add'
const handleButtonClick = (id) => {
  // Handle button click action here
  console.log(`Button clicked for row with ID: ${id}`)
}
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 200, editable: true },
  {
    field: 'price',
    headerName: 'Price ($)',
    type: 'number',
    width: 90,
    editable: true
  },
  {
    field: 'button',
    headerName: 'Action',
    width: 160,
    renderCell: (params) => {
      return (
        <Box sx={{ p: '2px' }}>
          <Button onClick={() => handleButtonClick(params.row.id)} sx={{ mr: '2px', bgcolor: '#65B741', ':hover': { bgcolor: 'green' } }} variant="outlined"><PreviewIcon sx={{ color: 'white' }} /></Button>
          <Button onClick={() => handleButtonClick(params.row.id)} variant="outlined"><BuildIcon /></Button>
        </Box>
      )
    }
  }

]
function FilmManager() {
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
        <Box typography='h3' sx={{ alignItems: 'center', justifyContent: 'center' }}>List Film</Box>
      </Box>
      <Box typography='h4' sx={{ alignItems: 'center', justifyContent: 'center' }}><Button variant="outlined" startIcon={<AddIcon />}>Add new film</Button></Box>
      <Box sx={{ width: '100%', height: 'calc(100vh-52px)' }}>
        <DataGrid
          sx={{
            '& .MuiDataGrid-cell--selected': {
              borderColor: 'transparent'
            }
          }}
          rows={productData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 8 }
            }
          }}
          // pageSizeOptions={[10, 15]}
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  )
}

export default FilmManager