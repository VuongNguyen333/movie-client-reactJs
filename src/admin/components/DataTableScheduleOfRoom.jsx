/* eslint-disable no-unused-vars */
import * as React from 'react'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import AddNewScheduleForm from './AddNewScheduleForm'
import { Button } from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
import { getAllRoomByBranchIdAPI } from '~/apis/roomApi'
import { getScheduleByMovieIdAndRoomIdAPI } from '~/apis/scheduleApi'
import { toast } from 'react-toastify'

export default function DataTableScheduleOfRoom({ data, branchId }) {
  const [formData, setFormData] = useState({})
  const [listRoom, setListRoom] = useState([])
  const [rows, setRows] = useState([])
  useEffect(() => {
    getAllRoomByBranchIdAPI(branchId).then(res => {
      // Tạo một mảng các promise cho tất cả các cuộc gọi API
      const promises = res.map(item => getScheduleByMovieIdAndRoomIdAPI({ ...formData, roomId: item.id }))

      // Sử dụng Promise.all để đợi cho tất cả các promise được giải quyết
      Promise.all(promises).then(responses => {
        const newData = res.map((item, index) => createData(item, responses[index]))
        // console.log('🚀 ~ Promise.all ~ newData:', newData)
        setRows(newData)
      }).catch(error => {
        toast.error(error.response.data)
        // console.error('Error when fetching ticket data:', error)
      })
      setListRoom(res)
    }).catch(error => {
      toast.error(error.response.data)
    })
  }, [branchId, formData])
  const handleAddNew = (data) => {
    // console.log('🚀 ~ handleAddNew ~ data:', data)
    rows.map(item => {
      if (item.room.id === data.roomResponse.id) {
        item.history.push(data)
      }
    })
    setRows(rows)
  }
  useEffect(() => {
    setFormData(data)
  }, [data, branchId])

  function createData(room, schedule) {
    return {
      room,
      history: schedule
    }
  }

  function Row(props) {
    const { row, formData } = props
    const [openForm, setOpenForm] = React.useState(false)
    const handleButtonClick = (id) => {
      formData.roomId = id
      setItemId(id)
      // console.log('🚀 ~ handleButtonClick ~ formData:', formData)
      // console.log(`Button clicked for row with ID: ${id}`)
    }
    const [itemId, setItemId] = useState(0)
    const [open, setOpen] = useState(false)
    const handleClose = () => {
      setOpenForm(false)
    }
    return (
      <React.Fragment>
        <TableRow sx={{ bgcolor:'#FEFAF6' }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row?.room?.id}
          </TableCell>
          <TableCell align="center">{row?.room?.name}</TableCell>
          <TableCell align="center">{row?.room?.status.toString()==='true' ? 'Active' : 'UnAcitve'}</TableCell>
          <TableCell align="center">{row?.room?.branchResponse?.name}</TableCell>
          <TableCell align="center">{row?.room?.branchResponse?.address}</TableCell>
          { row?.room.status
            ? < TableCell align="center">
              <Button
                onClick={() => {
                  handleButtonClick(row?.room?.id)
                  setOpenForm(true)
                }
                }>
              New Schedule
              </Button>
            </TableCell>
            : < TableCell align="center">
              <Button
                disabled
                onClick={() => {
                  handleButtonClick(row?.room?.id)
                  setOpenForm(true)
                }
                }>
            New Schedule
              </Button>
            </TableCell>
          }
        </TableRow>
        <TableRow sx={{ borderTop: '1px solid gray' }}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  List Schedule Of Room
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Id</TableCell>
                      <TableCell align="center">Start Date</TableCell>
                      <TableCell align="center" >Start Time</TableCell>
                      <TableCell align="center" >End Time</TableCell>
                      <TableCell align="center" >Film</TableCell>
                      <TableCell align="center" >Revenue</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row?.history?.map((historyRow) => (
                      <TableRow key={historyRow.id}>
                        <TableCell component="th" scope="row" align="center">
                          {historyRow.id}
                        </TableCell>
                        <TableCell align="center">{historyRow?.startDate}</TableCell>
                        <TableCell align="center">{historyRow?.startTime}</TableCell>
                        <TableCell align="center">{historyRow?.endTime}</TableCell>
                        <TableCell align="center">{historyRow?.movieResponse?.name}</TableCell>
                        <TableCell align="center">{historyRow?.revenue}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
        <AddNewScheduleForm open={openForm} onClose={handleClose} formData={formData} handleAddNew={handleAddNew}/>
      </React.Fragment>
    )
  }

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Id</TableCell>
              <TableCell align="center">Room</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Branch</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <Row key={row?.name} row={row} formData = {formData}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>

  )
}