import * as React from 'react'
import PropTypes from 'prop-types'
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
import { roomOfBranchThuDuc, scheduleOfRoomId52 } from '../../mock_data'
import { Button } from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
import AddNewScheduleForm from './AddNewScheduleForm'
import { idID } from '@mui/material/locale'

function createData(room, schedule) {
  return {
    room,
    history: schedule
  }
}

function Row(props) {
  const initForm = {
    'roomId' : '',
    'movieId' : '',
    'startDate' : '',
    'startTime' : ''
  }
  const [formDataReq, setFormDataReq] = useState(initForm)
  const { row, formData } = props
  const [openForm, setOpenForm] = React.useState(false)
  const handleButtonClick = (id) => {
    formData.roomId = id
    setItemId(id)
    console.log('🚀 ~ handleButtonClick ~ formData:', formData)
    console.log(`Button clicked for row with ID: ${id}`)
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
          {row.room.id}
        </TableCell>
        <TableCell align="center">{row.room.name}</TableCell>
        <TableCell align="center">{row.room.branchResponse.name}</TableCell>
        <TableCell align="center">{row.room.branchResponse.address}</TableCell>
        <TableCell align="center">
          <Button
            onClick={() => {
              handleButtonClick(row.room.id)
              setOpenForm(true)
            }
            }>
            New Schedule
          </Button>
        </TableCell>
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
                    <TableCell align="center" >Film</TableCell>
                    <TableCell align="center" >Revenue</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.id}>
                      <TableCell component="th" scope="row" align="center">
                        {historyRow.id}
                      </TableCell>
                      <TableCell align="center">{historyRow?.startDate}</TableCell>
                      <TableCell align="center">{historyRow?.startTime}</TableCell>
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
      <AddNewScheduleForm open={openForm} onClose={handleClose} formData={formData}/>
    </React.Fragment>
  )
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired
//       })
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired
//   }).isRequired
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
//   createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
//   createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
//   createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5)
// ]

export default function DataTableScheduleOfRoom({ data, branchId }) {
  const [formData, setFormData] = useState({})
  useEffect(() => {
    console.log('🚀 ~ useEffect ~ data:', data)
    console.log('🚀 ~ useEffect ~ branch:', branchId)
    setFormData(data)
  }, [data, branchId])
  let rows = []
  roomOfBranchThuDuc.map((item) => {
    // call api
    rows.push(createData(item, scheduleOfRoomId52))
  })

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Id</TableCell>
              <TableCell align="center">Room</TableCell>
              <TableCell align="center">Branch</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} formData = {formData}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>

  )
}