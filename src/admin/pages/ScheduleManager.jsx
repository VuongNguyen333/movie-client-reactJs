import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import DataTable from '../components/DataTable'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getScheduleByMovieIdAPI, getScheduleByRoomIdAPI } from '~/apis/scheduleApi'
import { getRoomByIdAPI } from '~/apis/roomApi'
import { getMovieByIdAPI } from '~/apis/movieApi'
import { formatNumber } from '~/utils/formatVnd'
import ViewAndUpdateButtonSchedule from '../components/ViewAndUpdateButtonSchedule'
import Loading from '~/admin/components/Loading'


function SchedulesManager() {
  const location = useLocation()
  // console.log('🚀 ~ SchedulesManager ~ location:', location)
  const [movie, setMovie] = useState({})
  const [room, setRoom] = useState({})
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (location.state) {
      setLoading(true)
      if (location.state.movieId) {
        const movieId = location.state.movieId
        // console.log('🚀 ~ SchedulesManager ~ movieId:', movieId)
        getMovieByIdAPI(movieId).then(res => setMovie(res))
        getScheduleByMovieIdAPI(movieId)
          .then(res => setData(res))
          .finally(() => setLoading(false))
        setRoom({})
      } else if (location.state.roomId) {
        const roomId = location.state.roomId
        // console.log('🚀 ~ SchedulesManager ~ movieId:', roomId)
        getRoomByIdAPI(roomId).then(res => setRoom(res))
        getScheduleByRoomIdAPI(roomId)
          .then(res => setData(res))
          .finally(() => setLoading(false))
        setMovie({})
      }
    } else {
      setData({})
    }
  }, [location])

  const handleUpdate = (item) => {
    const updatedList = data.map(schedule => {
      if (item?.id.toString() === schedule?.id.toString()) {
        // console.log('🚀 ~ updatedList ~ item:', item)
        return item // Áp dụng dữ liệu mới vào phim cần cập nhật
      }
      return schedule
    })
    // console.log('🚀 ~ handleUpdate ~ updatedList:', updatedList)
    setData(updatedList)
  }

  const columns = [
    // { field: 'id', headerName: 'ID', width: 70 },
    { field: 'startDate', headerName: 'Start Date', width: 100, editable: false },
    { field: 'startTime', headerName: 'Start Time', width: 100, editable: false },
    { field: 'revenue', headerName: 'Revenue', width: 100, editable: false, valueGetter: (params) => {
      return params !== 0 ? (formatNumber(params) + '.000đ') : 0
    } },
    { field: 'numberOfTickets', headerName: 'Ticket sold', width: 100, editable: false },
    { field: 'numberOfSeats', headerName: 'Total Seat', width: 100, editable: false },
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
          <ViewAndUpdateButtonSchedule params={params} handleUpdate={handleUpdate} />
        )
      },
      disableColumnMenu: true,
      sortable: false
    }
  ]

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
      { loading ? <Loading /> : <DataTable rows={data} columns={columns} /> }
    </Box>
  )
}

export default SchedulesManager