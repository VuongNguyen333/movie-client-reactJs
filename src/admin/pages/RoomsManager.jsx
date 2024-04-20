/* eslint-disable no-console */
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import DataTable from '../components/DataTable'
import { useLocation } from 'react-router-dom'
import ViewAndUpdateButtonRoom from '../components/ViewAndUpdateButtonRoom'
import AddNewRoomForm from '../components/AddNewRoomForm'
import { useState } from 'react'
import { useEffect } from 'react'
import { getAllRoomByBranchIdAPI } from '~/apis/roomApi'
import { getBranchbyIdAPI } from '~/apis/branchApi'


function RoomsManager() {
  const location = useLocation()
  const [rooms, setRooms] = useState([])
  const [branch, setBranch] = useState({})
  useEffect(() => {
    if (location.state) {
      const branchId = location.state.branchId
      getBranchbyIdAPI(branchId).then(res => setBranch(res))
      getAllRoomByBranchIdAPI(branchId).then(res => {
        console.log('🚀 ~ useEffect ~ res:', res)
        return setRooms(res)
      })
    } else {
      setRooms({})
    }
  }, [location])
  const handleAddNew = (data) => {
    const updatedList = [...rooms, data]
    console.log('🚀 ~ handleAddNew ~ updatedList:', updatedList)
    setRooms(updatedList)
  }

  const handleUpdate = (data) => {
    const updatedList = rooms.map(room => {
      if (room?.id.toString() === data?.id.toString()) {
        return data // Áp dụng dữ liệu mới vào phim cần cập nhật
      }
      return room
    })
    console.log('🚀 ~ handleUpdate ~ updatedList:', updatedList)
    setRooms(updatedList)
  }
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 150, editable: true },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      editable: true,
      valueGetter: (params) => {
        return params.toString() === 'true' ? 'Active' : 'UnActive'
      }
    },
    {
      field: 'branchResponse',
      headerName: 'Branch',
      width: 300,
      editable: true,
      valueGetter: (params) => {
        return params.name
      }
    },
    {
      field: 'button',
      headerName: 'Action',
      width: 100,
      renderCell: (params) => {
        return (
          <ViewAndUpdateButtonRoom params={params} handleUpdate={handleUpdate}/>
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
        <Box typography='h4' sx={{ alignItems: 'center', justifyContent: 'center', mt:'3px' }}>{branch?.name?.toUpperCase()}</Box>
      </Box>
      <AddNewRoomForm branchId={branch?.id} handleAddNew={handleAddNew}/>
      <DataTable rows={rooms} columns={columns} />
    </Box>
  )
}

export default RoomsManager