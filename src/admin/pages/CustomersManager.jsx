/* eslint-disable no-console */
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import DataTable from '../components/DataTable'
import ViewAndUpdateButtonCustomer from '../components/ViewAndUpdateButtonCustomer'
import { useEffect, useState } from 'react'
import { getListUserAPI } from '~/apis/userApi'

function CustomersManager() {
  const [listUser, setListUser] = useState([])
  useEffect(() => {
    getListUserAPI().then(res => {
      setListUser(res)
      console.log('🚀 ~ getListUserAPI ~ res:', res)
    })
  }, [])
  const handleUpdate = (data) => {
    const updatedList = listUser.map(film => {
      if (film?.id.toString() === data?.id.toString()) {
        return data // Áp dụng dữ liệu mới vào phim cần cập nhật
      }
      return film // Giữ nguyên các phim khác
    })
    console.log('🚀 ~ handleUpdate ~ updatedList:', updatedList)
    setListUser(updatedList)
  }
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'fullName', headerName: 'Full Name', width: 160, editable: true },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
      editable: true
    },
    { field: 'dob', headerName: 'Birth Day', width: 100, editable: true },
    { field: 'age', headerName: 'Age', width: 60, editable: true },
    { field: 'numberOfTickets', headerName: 'Number Ticket', width: 150, editable: true },
    { field: 'totalPayment', headerName: 'Total Payment(x1000Vnđ)', width: 200, editable: true },
    {
      field: 'roles',
      headerName: 'roles',
      width: 100,
      editable: true,
      valueGetter: (params) => {
        return params.map(role => role.name).join(', ')
      }
    },
    {
      field: 'button',
      headerName: 'Action',
      width: 100,
      renderCell: (params) => {
        return (
          <ViewAndUpdateButtonCustomer params={params} handleUpdate={handleUpdate}/>
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
        <Box typography='h4' sx={{ alignItems: 'center', justifyContent: 'center' }}>LIST CUSTOMERS</Box>
      </Box>
      <Box sx={{ height: '42px' }}></Box>
      <DataTable rows={listUser} columns={columns} />
    </Box>
  )
}

export default CustomersManager