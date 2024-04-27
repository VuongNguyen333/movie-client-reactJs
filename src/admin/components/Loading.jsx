import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

function Loading() {
  return (
    <Box sx={{
      display:'flex',
      color: 'white',
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100vh'
    }}>
      <CircularProgress />
      <Typography>Loading data...</Typography>
    </Box>
  )
}

export default Loading