/* eslint-disable no-console */
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import DataTable from '../components/DataTable'
import ViewAndUpdateButtonCustomer from '../components/ViewAndUpdateButtonCustomer'
import { useEffect, useState } from 'react'
import { getListUserAPI } from '~/apis/userApi'
import { formatNumber } from '~/utils/formatVnd'
import Loading from '~/admin/components/Loading'

function CustomersManager() {
  const [listUser, setListUser] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    getListUserAPI().then(res => {
      setListUser(res)
      console.log('🚀 ~ getListUserAPI ~ res:', res)
    }).finally(() => setLoading(false))
  }, [])
  const handleUpdate = (data) => {
    const updatedList = listUser.map(user => {
      if (user?.id.toString() === data?.id.toString()) {
        return data // Áp dụng dữ liệu mới vào phim cần cập nhật
      }
      return user
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
    { field: 'totalPayment', headerName: 'Total Payment', width: 200, editable: true, valueGetter: (params) => {
      return params !== 0 ? (formatNumber(params) + '.000đ') : 0
    } },
    {
      field: 'roles',
      headerName: 'Roles',
      width: 270,
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
      { loading ? <Loading /> : <DataTable rows={listUser} columns={columns} />}
    </Box>
  )
}

export default CustomersManager