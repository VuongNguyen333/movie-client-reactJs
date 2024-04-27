/* eslint-disable no-console */
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
import { useState } from 'react'
import { useEffect } from 'react'
import { getListBillByUserIdAPI } from '~/apis/billApi'
import { getListTicketByBillIdAPI } from '~/apis/ticketApi'
import Loading from '~/admin/components/Loading'
import { CircularProgress } from '@mui/material'

export default function BillOfUserDetails({ userId }) {
  const [rows, setRows] = useState([])
  const [listBill, setListBill] = useState(null)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    getListBillByUserIdAPI(userId).then(res => {
      // Tạo một mảng các promise cho tất cả các cuộc gọi API
      const promises = res.map(item => getListTicketByBillIdAPI(item.id))
      // Sử dụng Promise.all để đợi cho tất cả các promise được giải quyết
      Promise.all(promises).then(responses => {
        const newData = res.map((item, index) => createData(item, responses[index]))
        console.log('🚀 ~ Promise.all ~ newData:', newData)
        setRows(newData)
      }).catch(error => {
        console.error('Error when fetching ticket data:', error)
      }).finally(setLoading(false))
      setListBill(res)
    }).catch(error => {
      console.error('Error when fetching bill data:', error)
    })
  }, [userId])
  function createData(bill, ticket) {
    return {
      bill,
      history: ticket
    }
  }

  function Row(props) {
    const { row } = props
    const [open, setOpen] = React.useState(false)

    return (
      <React.Fragment>
        <TableRow sx={{ bgcolor: '#1a1d29' }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
              sx={{ color: 'white' }}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell sx={{ color: 'white' }} align="center">{`${row.bill.createdDate.toString() + ' ' + row.bill.createdTime}`}</TableCell>
          <TableCell sx={{ color: 'white' }} align="center">{row.history[0].scheduleResponse.startDate + ' ' + row.history[0].scheduleResponse.startTime}</TableCell>
          <TableCell sx={{ color: 'white' }} align="center">{row.history[0].scheduleResponse.movieResponse.name}</TableCell>
          <TableCell sx={{ color: 'white' }} align="center">{row.history[0].scheduleResponse.roomResponse.branchResponse.name}</TableCell>
          <TableCell sx={{ color: 'white' }} align="center">{row.bill.payment}</TableCell>
          <TableCell sx={{ color: 'white' }} align="center">{row.bill.numberOfTickets}</TableCell>
          <TableCell sx={{ color: 'white' }} align="center">{row.bill.userResponse.fullName}</TableCell>
        </TableRow>
        <TableRow sx={{ borderTop: '1px solid gray' }} >
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
            <Collapse in={open} timeout='auto' unmountOnExit >
              <Box sx={{ margin: 1, width: '300px' }}>
                <Typography variant="h6" gutterBottom component="div" sx={{ color: 'white' }}>
                  Ticket Of Bill
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" sx={{ color: 'white' }}>Seat</TableCell>
                      <TableCell align="center" sx={{ color: 'white' }}>Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.history.map((historyRow) => (
                      <TableRow key={historyRow.id}>
                        <TableCell align="center" sx={{ color: 'white' }}>{historyRow.seatResponse.name}</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>{historyRow.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    )
  }

  return (
    loading ? (<Box sx={{
      display:'flex',
      color: 'white',
      flexGrow: 1,
      width:'100%',
      overflow: 'auto',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <CircularProgress />
      <Typography>Loading data...</Typography>
    </Box>) : (
      <Box
        sx={{
          width:'100%',
          bgcolor:'#1a1d29',
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          mb: 3
        }}>
        <Box sx={{ border:'2px solid #454D6A', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <TableContainer component={Paper} sx={{ width:'90%' }}>
            <Table aria-label="collapsible table" sx={{ color: 'white', bgcolor:'#1a1d29' }}>
              <TableHead sx={{ color: 'white' }}>
                <TableRow sx={{ color: 'white' }}>
                  <TableCell />
                  <TableCell align="center" sx={{ color:'white' }}>Create At</TableCell>
                  <TableCell align="center" sx={{ color:'white' }}>Show Time</TableCell>
                  <TableCell align="center" sx={{ color:'white' }}>Film</TableCell>
                  <TableCell align="center" sx={{ color:'white' }}>Branch</TableCell>
                  <TableCell align="center" sx={{ color:'white' }}>Payment</TableCell>
                  <TableCell align="center" sx={{ color:'white' }}>Number Ticket</TableCell>
                  <TableCell align="center" sx={{ color:'white' }}>Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <Row key={row.name} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    )
  )
}