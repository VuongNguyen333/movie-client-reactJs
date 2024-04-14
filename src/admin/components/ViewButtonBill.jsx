import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import PreviewIcon from '@mui/icons-material/Preview'
import BuildIcon from '@mui/icons-material/Build'
import { useState } from 'react'
import UpdateFilmForm from './UpdateFilmForm'
import UpdateCustomerForm from './UpdateCustomerForm'
import { users, branchs, scheduleMovieMai } from '~/mock_data'
import UpdateBranchForm from './UpdateBranchForm'
import SchedulesManager from '../pages/ScheduleManager'
import { Link } from 'react-router-dom'
function ViewButtonBill({ params }) {
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
      <Link to={`/admin/tickets/bill/${params.row.id}`}>
        <Button
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
    </Box>
  )
}

export default ViewButtonBill