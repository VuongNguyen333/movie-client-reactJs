import { Box, Typography } from '@mui/material'
import React from 'react'
function FinishPayment() {
  return (
    <React.Fragment>
      <Typography sx={{ mt: 2, mb: 1, color: 'white' }}>
        Payment Loading...
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Box sx={{ flex: '1 1 auto' }} />
      </Box>
    </React.Fragment>
  )
}

export default FinishPayment