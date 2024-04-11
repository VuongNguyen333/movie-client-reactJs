import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import PreviewIcon from '@mui/icons-material/Preview'
import BuildIcon from '@mui/icons-material/Build'

function ViewAndUpdateButton({ params }) {
  const handleButtonClick = (id) => {
    // Handle button click action here
    console.log(`Button clicked for row with ID: ${id}`)
  }
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
        onClick={() => handleButtonClick(params.row.id)}
        sx={{
          bgcolor: '#DC6B19',
          minWidth:'40px',
          ':hover': { bgcolor: '#F7C566' }
        }}
      >
        <BuildIcon fontSize='small' sx={{ color:'white' }} />
      </Button>
    </Box>
  )
}

export default ViewAndUpdateButton