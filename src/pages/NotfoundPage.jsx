import { Box } from '@mui/material'
import { Link } from 'react-router-dom'
import imgNotfound from '~/assets/24.png'

function NotfoundPage() {
  return (
    <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', bgcolor:'#1a1d29', height:'100vh' }}>
      <Box>
        <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', color:'white' }}>
          <Box typography='h5' >
            Page Not Found!
          </Box>
        </Box>
        <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', color:'white' }}>
          <p>Go to the <Link to='/'>Homepage</Link></p>
        </Box>
        <img src={imgNotfound} style={{ height:'550px', width:'780px', alignItems:'center', justifyContent:'center' }}></img>
      </Box>
    </Box>
  )
}

export default NotfoundPage