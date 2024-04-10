import Box from '@mui/material/Box'
function CustomersManager() {
  return (
    <Box
      sx={{
        display:'flex',
        color:'black',
        bgcolor:'white',
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        alignItems:'center',
        justifyContent:'center'
      }}>
      <Box>Customers Manager</Box>
    </Box>
  )
}

export default CustomersManager