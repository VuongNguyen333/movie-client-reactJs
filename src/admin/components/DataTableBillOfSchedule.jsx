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
import { billScheduleId111, ticketBillId10 } from '../../mock_data'

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
      <TableRow sx={{ bgcolor: '#FEFAF6' }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            sx={{ color: 'black' }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell sx={{ color: 'black' }} component="th" scope="row">
          {row.bill.id}
        </TableCell>
        <TableCell sx={{ color: 'black' }} align="center">{`${row.bill.createdDate.toString() + ' ' + row.bill.createdTime}`}</TableCell>
        <TableCell sx={{ color: 'black' }} align="center">{row.bill.payment}</TableCell>
        <TableCell sx={{ color: 'black' }} align="center">{row.bill.numberOfTickets}</TableCell>
        <TableCell sx={{ color: 'black' }} align="center">{row.bill.userResponse.fullName}</TableCell>
      </TableRow>
      <TableRow sx={{ borderTop: '1px solid gray' }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                List Ticket Of Bill
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Id</TableCell>
                    <TableCell align="center">Seat</TableCell>
                    <TableCell align="center" >Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.id}>
                      <TableCell component="th" scope="row" align="center">
                        {historyRow.id}
                      </TableCell>
                      <TableCell align="center">{historyRow.seatResponse.name}</TableCell>
                      <TableCell align="center">{historyRow.price}</TableCell>
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

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired
  }).isRequired
}

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
//   createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
//   createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
//   createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5)
// ]

let rows = []

billScheduleId111.map((item) => {
  // call api
  rows.push(createData(item, ticketBillId10))
})

export default function DataTableBillOfSchedule() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" sx={{ color: 'black' }}>
        <TableHead>
          <TableRow sx={{ color: 'black' }}>
            <TableCell />
            <TableCell>Id</TableCell>
            <TableCell align="center">Create At</TableCell>
            <TableCell align="center">Payment</TableCell>
            <TableCell align="center">Number Ticket</TableCell>
            <TableCell align="center">Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}