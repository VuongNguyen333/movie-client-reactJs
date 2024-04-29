import * as React from 'react'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Title from './Title'
import { useState } from 'react'
import { useEffect } from 'react'
import { formatNumber } from '~/utils/formatVnd'

function preventDefault(event) {
  event.preventDefault()
}

export default function Deposits({ listBill }) {
  const [data, setData] = useState(null)
  const [total, setTotal] = useState(0)
  useEffect(() => {
    setData(listBill)
    let tmp = 0
    listBill?.forEach(item => tmp+=item.revenue)
    setTotal(tmp)
  }, [listBill])
  return (
    <React.Fragment>
      <Title>Recent Deposits</Title>
      <Typography component="p" variant="h4">
        {formatNumber(total).toString() === '0' ? '0' : `${formatNumber(total)}.000đ`}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  )
}