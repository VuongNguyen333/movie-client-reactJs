import { Box, Toolbar } from '@mui/material'
import imgNotfound from '~/assets/24.png'
function NotfoundPageAdmin() {
  return (
    <Box component="main"
      sx={{
      // display:'flex',
        display:'flex',
        color: 'white',
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vh'
      }}
    >
      <Box>
        <Toolbar />
        <Box
          sx={{ display:'flex',
            color: 'white',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          NOT FOUND!
        </Box>
        <img src={imgNotfound} style={{ height:'550px', width:'780px', alignItems:'center', justifyContent:'center' }}></img>
      </Box>
    </Box>
  )
}

export default NotfoundPageAdmin