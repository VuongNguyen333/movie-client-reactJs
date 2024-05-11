import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import DataTable from '../components/DataTable'
import AddNewBranchForm from '../components/AddNewBranchForm'
import ViewAndUpdateButtonBranch from '../components/ViewAndUpdateButtonBranch'
import { useEffect, useState } from 'react'
import { getListBranchAPI } from '~/apis/branchApi'
import { formatNumber } from '~/utils/formatVnd'
import Loading from '~/admin/components/Loading'

function BranchsManager() {
  const [branchs, setBranchs] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    getListBranchAPI()
      .then(res => setBranchs(res))
      .finally(() => setLoading(false))
  }, [])

  const handleAddNew = (data) => {
    const updatedList = [...branchs, data]
    // console.log('🚀 ~ handleAddNew ~ updatedList:', updatedList)
    setBranchs(updatedList)
  }

  const handleUpdate = (data) => {
    const updatedList = branchs.map(branch => {
      if (branch?.id.toString() === data?.id.toString()) {
        return data // Áp dụng dữ liệu mới vào phim cần cập nhật
      }
      return branch
    })
    // console.log('🚀 ~ handleUpdate ~ updatedList:', updatedList)
    setBranchs(updatedList)
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'name', headerName: 'Name', width: 200, editable: false },
    {
      field: 'address',
      headerName: 'Address',
      width: 400,
      editable: false
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      editable: false,
      valueGetter: (params) => {
        return params.toString()==='true' ? 'Active' : 'UnActive'
      }
    },
    { field: 'introduction', headerName: 'Introduction', width: 150, editable: false },
    {
      field: 'areaResponse',
      headerName: 'Area',
      width: 120,
      editable: false,
      valueGetter: (params) => {
        return params.name
      }
    },
    {
      field: 'revenue',
      headerName: 'Revenue',
      width: 150,
      editable: false,
      valueGetter: (params) => {
        return params !== 0 ? (formatNumber(params) + '.000đ') : 0
      }
    },
    {
      field: 'button',
      headerName: 'Action',
      width: 100,
      renderCell: (params) => {
        return (
          <ViewAndUpdateButtonBranch params={params} handleUpdate={handleUpdate}/>
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
        <Box typography='h4' sx={{ alignItems: 'center', justifyContent: 'center' }}>LIST BRANCHS</Box>
      </Box>
      <AddNewBranchForm handleAddNew={handleAddNew} />
      { loading ? <Loading /> : <DataTable rows={branchs} columns={columns} /> }
    </Box>
  )
}

export default BranchsManager