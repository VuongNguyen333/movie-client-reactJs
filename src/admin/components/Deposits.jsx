import * as React from 'react'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Title from './Title'
import { useState } from 'react'
import { useEffect } from 'react'
import { formatNumber } from '~/utils/formatVnd'
import { Box } from '@mui/material'

function preventDefault(event) {
  event.preventDefault()
}

export default function Deposits({ listBill }) {
  const [total, setTotal] = useState(0)
  const [ticket, setTicket] = useState(0)
  useEffect(() => {
    let tmp = 0
    let tmpTicket = 0
    listBill?.forEach(item => {
      tmp+=item.revenue
      tmpTicket+=item.numberOfTickets
    })
    setTotal(tmp)
    setTicket(tmpTicket)
  }, [listBill])
  return (
    <React.Fragment>
      <Title>Recent Deposits</Title>
      <Typography component="p" variant="h4">
        {formatNumber(total).toString() === '0' ? '0' : `${formatNumber(total)}.000đ`}
      </Typography>
      <Box>
        Number Of Ticket: {ticket}
      </Box>
      <div>
        <Link color="primary" href="" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  )
}