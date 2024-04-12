import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import PreviewIcon from '@mui/icons-material/Preview'
import BuildIcon from '@mui/icons-material/Build'
import { useState } from 'react'
import UpdateFilmForm from './UpdateFilmForm'

function ViewAndUpdateButton({ params }) {
  const handleButtonClick = (id) => {
    setItemId(id)
    // Handle button click action here
    console.log(`Button clicked for row with ID: ${id}`)
  }
  const [itemId, setItemId] = useState(0)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <Box>
      <Button
        onClick={() => handleButtonClick(params.row.id)}
        sx={{
          mr: '2px',
          bgcolor: '#65B741',
          minWidth:'40px',
          ':hover': { bgcolor: 'green' }
        }}
      >
        <PreviewIcon fontSize='small' sx={{ color: 'white' }} />
      </Button>
      <Button
        onClick={() => {
          setOpen(true)
          handleButtonClick(params.row.id)
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
      </Button>
      <UpdateFilmForm open={open} onClose={handleClose} itemId={itemId}/>
    </Box>
  )
}

export default ViewAndUpdateButton