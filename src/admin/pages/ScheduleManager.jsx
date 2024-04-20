/* eslint-disable no-console */
import Box from '@mui/material/Box'
import { productData, rooms, scheduleMovieMai, scheduleOfRoomId52 } from '~/mock_data'
import Toolbar from '@mui/material/Toolbar'
import DataTable from '../components/DataTable'
import ViewAndUpdateButton from '../components/ViewAndUpdateButton'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getScheduleByMovieIdAPI, getScheduleByRoomIdAPI } from '~/apis/scheduleApi'
import { getRoomByIdAPI } from '~/apis/roomApi'
import { getMovieByIdAPI } from '~/apis/movieApi'

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'startDate', headerName: 'Start Date', width: 100, editable: false },
  { field: 'startTime', headerName: 'Start Time', width: 100, editable: false },
  { field: 'revenue', headerName: 'Revenue', width: 100, editable: false },
  { field: 'numberOfTickets', headerName: 'Ticket sold', width: 100, editable: false },
  {
    field: 'movieResponse',
    headerName: 'Movie',
    width: 200,
    editable: false,
    valueGetter: (params) => {
      return params.name
    }
  },
  {
    field: 'roomResponse',
    headerName: 'Room',
    width: 350,
    editable: false,
    valueGetter: (params) => {
      return `${params.name} (Branch ${params.branchResponse.name})`
    }
  },
  {
    field: 'button',
    headerName: 'Action',
    width: 100,
    renderCell: (params) => {
      return (
        <ViewAndUpdateButton params={params}/>
      )
    },
    disableColumnMenu: true,
    sortable: false
  }
]
function SchedulesManager() {
  const location = useLocation()
  console.log('🚀 ~ SchedulesManager ~ location:', location)
  const [movie, setMovie] = useState({})
  const [room, setRoom] = useState({})
  const [data, setData] = useState([])

  useEffect(() => {
    if (location.state) {
      if (location.state.movieId) {
        const movieId = location.state.movieId
        // console.log('🚀 ~ SchedulesManager ~ movieId:', movieId)
        getScheduleByMovieIdAPI(movieId).then(res => setData(res))
        getMovieByIdAPI(movieId).then(res => setMovie(res))
        setRoom({})
      } else if (location.state.roomId) {
        const roomId = location.state.roomId
        // console.log('🚀 ~ SchedulesManager ~ movieId:', roomId)
        getScheduleByRoomIdAPI(roomId).then(res => setData(res))
        getRoomByIdAPI(roomId).then(res => setRoom(res))
        setMovie({})
      }
    } else {
      setData({})
    }
  }, [location])

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
        <Box typography='h4' sx={{ alignItems: 'center', justifyContent: 'center' }}>SCHEDULE {movie?.name ? `FILM ${movie?.name.toUpperCase()}` : room?.name ? `ROOM ${room?.name.toUpperCase()}` : ''}</Box>
      </Box>
      { room?.name &&
        <Box sx={{ height:'45px' }}>
          <Box typography='h5' sx={{ ml:'5px', fontSize:18 }}>Room: {room?.name}</Box>
          <Box typography='h5' sx={{ ml:'5px', fontSize:18 }}>Branch: {room?.branchResponse?.name}</Box>
        </Box>
      }
      { movie?.name && <Box sx={{ height:'45px' }}></Box> }
      <DataTable rows={data} columns={columns} />
    </Box>
  )
}

export default SchedulesManager