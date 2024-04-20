/* eslint-disable no-console */
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import DataTableBillOfSchedule from '../components/DataTableBillOfSchedule'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { getScheduleByIdAPI } from '~/apis/scheduleApi'
import { useState } from 'react'

function BillsManager() {
  const { scheduleId } = useParams()
  console.log('🚀 ~ BillsManager ~ scheduleId:', scheduleId)
  const [schedule, setSchedule] = useState({})
  useEffect(() => {
    getScheduleByIdAPI(scheduleId).then(res => setSchedule(res))
  }, [scheduleId])
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
          <Box sx={{ ml: '5px', fontSize: 15 }}>Film: {schedule?.movieResponse?.name}</Box>
          <Box sx={{ ml: '5px', fontSize: 15 }}>Room: {schedule?.roomResponse?.name}</Box>
        </Box>
        <Box>
          <Box sx={{ ml: '5px', fontSize: 15 }}>Branch: {schedule?.roomResponse?.branchResponse?.name}</Box>
          <Box sx={{ ml: '5px', fontSize: 15 }}>Time Schedule: {schedule?.startTime?.toString() + ' ' + schedule?.startDate}</Box>
        </Box>
      </Box>
      <DataTableBillOfSchedule scheduleId={scheduleId}/>
    </Box>
  )
}

export default BillsManager