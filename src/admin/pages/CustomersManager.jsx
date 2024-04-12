/* eslint-disable no-console */
import Box from '@mui/material/Box'
import { productData, users } from '~/mock_data'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import PreviewIcon from '@mui/icons-material/Preview'
import BuildIcon from '@mui/icons-material/Build'
import AddIcon from '@mui/icons-material/Add'
import React from 'react'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import DataTable from '../components/DataTable'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}
const handleButtonClick = (id) => {
  // Handle button click action here
  console.log(`Button clicked for row with ID: ${id}`)
}
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'fullName', headerName: 'Full Name', width: 160, editable: true },
  {
    field: 'email',
    headerName: 'Email',
    width: 250,
    editable: true
  },
  { field: 'dob', headerName: 'Birth Day', width: 100, editable: true },
  { field: 'age', headerName: 'Age', width: 60, editable: true },
  {
    field: 'roles',
    headerName: 'roles',
    width: 300,
    editable: true,
    valueGetter: (params) => {
      return params.map(role => role.name).join(', ')
    }
  },
  {
    field: 'button',
    headerName: 'Action',
    width: 100,
    renderCell: (params) => {
      return (
        <Box>
          <Button
            onClick={() => handleButtonClick(params.row.id)}
            sx={{
              mr: '2px',
              bgcolor: '#65B741',
              minWidth: '40px',
              ':hover': { bgcolor: 'green' }
            }}
          >
            <PreviewIcon fontSize='small' sx={{ color: 'white' }} />
          </Button>
          <Button
            onClick={() => handleButtonClick(params.row.id)}
            sx={{
              bgcolor: '#DC6B19',
              minWidth: '40px',
              ':hover': { bgcolor: '#F7C566' }
            }}
          >
            <BuildIcon fontSize='small' sx={{ color: 'white' }} />
          </Button>
        </Box>
      )
    },
    disableColumnMenu: true,
    sortable: false
  }
]
function CustomersManager() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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
        <Box typography='h3' sx={{ alignItems: 'center', justifyContent: 'center' }}>List Customers</Box>
      </Box>
      <Box typography='h4' sx={{ alignItems: 'center', justifyContent: 'center' }}>
        <Button onClick={handleOpen} variant="outlined" startIcon={<AddIcon />}>Add new User</Button>
      </Box>
      <DataTable rows={users} columns={columns} />
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add new User
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Comming soon...
            </Typography>
          </Box>
        </Modal>
      </div>
    </Box>
  )
}

export default CustomersManager