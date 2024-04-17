/* eslint-disable no-console */
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
function DataTable({ rows, columns }) {
  return (
    <Box sx={{ width: '100%', height: 'calc(100vh - 150px)' }}>
      <DataGrid
        sx={{
          '& .MuiDataGrid-cell--selected': {
            borderColor: 'transparent'
          },
          overflowX: 'auto',
          color: 'black'
        }}
        rows={rows}
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
  )
}
export default DataTable