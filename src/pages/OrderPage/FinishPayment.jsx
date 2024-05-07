import { Box, Button, Typography } from '@mui/material'
import React from 'react'
function FinishPayment({ handleReset }) {
  return (
    <React.Fragment>
      <Typography sx={{ mt: 2, mb: 1, color: 'white' }}>
        Payment SuccessFully!
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button onClick={handleReset}>Finish</Button>
      </Box>
    </React.Fragment>
  )
}

export default FinishPayment