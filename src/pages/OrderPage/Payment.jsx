import Box from '@mui/material/Box'
import { useParams } from 'react-router-dom'
import Radio from '@mui/material/Radio'
import Typography from '@mui/material/Typography'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import shopeePay from '~/assets/shopeepay.png'
import vnPay from '~/assets/vnpay.png'
import zalopay from '~/assets/zalopay.png'
import { useEffect, useState } from 'react'
import { getBranchbyIdAPI } from '~/apis/branchApi'
import { getScheduleByIdAPI } from '~/apis/scheduleApi'
import { getListSeatAPI } from '~/apis/seat'

export default function Payment({ branchId, scheduleId, total, payment, listSeatId, stringSeat }) {
  // console.log('🚀 ~ Payment ~ listSeatId:', listSeatId)
  const [branch, setBranch] = useState({})
  const [schedule, setSchedule] = useState({})
  const [seats, setSeats] = useState([])
  const { filmName } = useParams()
  const [isSeatsLoaded, setIsSeatsLoaded] = useState(false)
  useEffect(() => {
    if (!isSeatsLoaded) {
      getBranchbyIdAPI(branchId).then(res => {
        setBranch(res)
      })
      getScheduleByIdAPI(scheduleId).then(res => {
        setSchedule(res)
      })
      getListSeatAPI(scheduleId).then(res => {
        setSeats(res)
        setIsSeatsLoaded(true)
      })
    }
  }, [branchId, scheduleId, seats, isSeatsLoaded, listSeatId])
  return (
    <Box sx={{ height:'100%', alignItems: 'center', justifyContent:'center' }}>
      <Box sx={{ alignItems: 'center', justifyContent:'center' }}>
        <Box sx={{ display:'flex', alignContent:'center', justifyContent:'center' }}>
          <Box sx={{ color:'white', typography:'h4' }}>
        Thanh Toán
          </Box>
        </Box>
        <Box sx={{ display:'flex', width:'100%', height:'100%', alignContent:'center', justifyContent:'center' }}>
          <Box sx={{ display:'flex', width: '90%', alignContent:'center', justifyContent:'space-between' }}>
            <Box sx={{ color: 'white', m:'5px', width:'50%' }}>
              <Box sx={{ alignItems:'center', justifyContent:'center', border:'1px solid white', p:'5px', borderRadius:'10px' }} >
                <Box sx={{ alignItems:'center', justifyContent:'center', border:'1px solid white', p:'5px', borderRadius:'10px' }}>
                  <Box sx={{ alignItems:'center', justifyContent:'center', typography:'h5', borderBottom:'1px solid white', color:'#16FF00', width:'100%' }} >{filmName}</Box>
                  <Box sx={{ typography:'h5', width:' 100%' }}>{branch?.name}</Box>
                  <Box sx={{ width:' 100%' }}>{`- ${schedule?.startTime?.toString() + ' ' + schedule?.startDate+ ' Room: ' + schedule?.roomResponse?.name}`}</Box>
                  <Box sx={{ width:' 100%' }}> - Vị trí ghế: {stringSeat? stringSeat : ''}</Box>
                  <Box sx={{ color: 'white', borderTop:'1px solid white', width:' 100%' }}>
                    Tổng hóa đơn: {total}.000đ
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={{ border:'1px solid white', color: 'white', p :'5px', m:'5px', display:'flex', alignItems:'center', justifyContent:'center', borderRadius: '10px', width:'70%', height:'fit-content', minWidth:200 }}>
              <Box sx={{ border:'1px solid white', p:'5px', borderRadius:'10px', width:'100%', height:'100%' }} >
                <FormControl sx={{ justifyContent:'center' }}>
                  <FormLabel
                    sx={{
                      color:'white',
                      '&.MuiFormLabel-root' : {
                        '&.Mui-focused' : { color: 'white' }
                      }
                    }}
                    id="demo-radio-buttons-group-label">
                    Phương thức thanh toán
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="ZaloPay"
                    name="radio-buttons-group"
                    sx={{ '& .MuiButtonBase-root': {
                      '&.MuiRadio-root.Mui-checked' : { color: 'green' }
                    },
                    '& .MuiButtonBase-root.MuiRadio-root':
                      { color: 'white' }
                    }}
                  >
                    <FormControlLabel value="ZaloPay" control={<Radio onClick={payment('Okok')} />} label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img
                          src={zalopay}
                          alt="ZaloPay Logo"
                          style={{ marginRight: '8px', height:'30px' }} />
                        <Typography>Thanh toán bằng ZaloPAY</Typography>
                      </Box>
                    }/>
                    <FormControlLabel value="VnPay" control={<Radio onClick={payment('1')} />} label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img
                          src={vnPay}
                          alt="VnPay Logo"
                          style={{ marginRight: '8px', height:'30px' }} />
                        <Typography>Thanh toán bằng VNPAY</Typography>
                      </Box>
                    } />
                  </RadioGroup>
                </FormControl>
              </Box>
            </Box>
            <Box></Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}