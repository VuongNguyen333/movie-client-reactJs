import * as React from 'react'
import Typography from '@mui/material/Typography'
import Title from './Title'
import { useState } from 'react'
import { useEffect } from 'react'
import { formatNumber } from '~/utils/formatVnd'

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
      <Title>Number Tickets</Title>
      <Typography component="p" variant="h4">
        {ticket}
      </Typography>
    </React.Fragment>
  )
}