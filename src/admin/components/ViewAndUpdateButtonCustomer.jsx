import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import PreviewIcon from '@mui/icons-material/Preview'
import BuildIcon from '@mui/icons-material/Build'
import UpdateCustomerForm from './UpdateCustomerForm'
import { Link } from 'react-router-dom'
function ViewAndUpdateButtonCustomer({ params, handleUpdate }) {
  const handleButtonClick = (id) => {
    setItemId(id)
    // Handle button click action here
    console.log(`Button clicked for row with ID: ${id}`)
  }
  const [itemId, setItemId] = useState(0)
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Box>
      <Link to={`/admin/bills/user/${params.row.id}`}>
        <Button
          onClick={() => {
            handleButtonClick(params.row.id)
          }}
          sx={{
            mr: '2px',
            bgcolor: '#65B741',
            minWidth:'40px',
            ':hover': { bgcolor: 'green' }
          }}
        >
          <PreviewIcon fontSize='small' sx={{ color: 'white' }} />
        </Button>
      </Link>
      <Button
        onClick={() => {
          handleButtonClick(params.row.id)
          setOpen(true)
        }}
        sx={{
          bgcolor: '#DC6B19',
          minWidth:'40px',
          ':hover': { bgcolor: '#F7C566' }
        }}
      >
        <BuildIcon
          fontSize='small'
          sx={{ color:'white' }}
        />
      </Button><UpdateCustomerForm open={open} onClose={handleClose} userId={itemId} handleUpdate={handleUpdate}/>
    </Box>
  )
}

export default ViewAndUpdateButtonCustomer