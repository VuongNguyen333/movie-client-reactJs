/* eslint-disable no-console */
import Box from '@mui/material/Box'
import { users } from '~/mock_data'
import Toolbar from '@mui/material/Toolbar'
import { useParams } from 'react-router-dom'
import DataTableBillOfSchedule from '../components/DataTableBillOfSchedule'

function BillOfUserManager() {
  const { userId } = useParams()
  const user = [...users].find(item => item.id.toString() === userId.toString())
  console.log('🚀 ~ BillOfUserManager ~ user:', user)
  return (
    <Box
      component="main"
      sx={{
        // display:'flex',
        color: 'black',
        bgcolor: 'white',
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
      }}>
      <Toolbar />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box typography='h4' sx={{ alignItems: 'center', justifyContent: 'center' }}>LIST BILLS</Box>
      </Box>
      <Box sx={{ height: 'fit-content', display: 'flex' }}>
        <Box sx={{ mr: '30px' }}>
          <Box sx={{ ml: '5px', fontSize: 15 }}>Name: {user?.fullName}</Box>
          <Box sx={{ ml: '5px', fontSize: 15 }}>Email: {user?.email}</Box>
          <Box sx={{ ml: '5px', fontSize: 15 }}>Date Of Birth: {user?.dob}</Box>
        </Box>
      </Box>
      {/* <DataTable rows={data} columns={columns} /> */}
      <DataTableBillOfSchedule />
    </Box>
  )
}

export default BillOfUserManager