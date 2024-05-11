import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

export default function Loading() {
  return (
    <Box sx={{
      display:'flex',
      color: 'white',
      flexGrow: 1,
      width:'100%',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <CircularProgress />
      <Typography>Loading data...</Typography>
    </Box>
  )
}