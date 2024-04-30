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
import { useState } from 'react'
import { useEffect } from 'react'
import { formatNumber } from '~/utils/formatVnd'

export default function DataBillStatistic({ listBill }) {
  const [rows, setRows] = useState([])

  useEffect(() => {
    setRows(listBill)
    // console.log('🚀 ~ Orders ~ listBill:', listBill)
  }, [listBill])

  function Row(props) {
    const { row } = props
    const [open, setOpen] = React.useState(false)

    return (
      <React.Fragment>
        <TableRow sx={{ }}>
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
          <TableCell sx={{ color: 'black' }} align="center">{row?.date}</TableCell>
          <TableCell sx={{ color: 'black' }} align="center">{row?.numberOfTickets}</TableCell>
          <TableCell sx={{ color: 'black' }} align="center">{formatNumber(row?.revenue).toString() === '0' ? '0' : `${formatNumber(row?.revenue)}.000đ`}</TableCell>
        </TableRow>
        <TableRow sx={{ borderTop: '1px solid gray' }}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1, width: '100%' }}>
                <Typography variant="h6" gutterBottom component="div">
                  Ticket Of Bill
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Create at</TableCell>
                      <TableCell align="center">Create Time</TableCell>
                      <TableCell align="center">Number Of Tickets</TableCell>
                      <TableCell align="center">Payment</TableCell>
                      <TableCell align="center">Customer</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row?.billResponses?.map((historyRow) => (
                      <TableRow key={historyRow.id}>
                        <TableCell align="center">{historyRow?.createdDate}</TableCell>
                        <TableCell align="center">{historyRow?.createdTime}</TableCell>
                        <TableCell align="center">{historyRow?.numberOfTickets}</TableCell>
                        <TableCell align="center">{formatNumber(historyRow?.payment).toString() === '0' ? '0' : `${formatNumber(historyRow?.payment)}.000đ`}</TableCell>
                        <TableCell align="center">{historyRow?.userResponse?.fullName}</TableCell>
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
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" sx={{ color: 'black' }}>
        <TableHead>
          <TableRow sx={{ color: 'black' }}>
            <TableCell />
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">NumberOfTicket</TableCell>
            <TableCell align="center">Revenue</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <Row key={row?.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}