import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Typography from '@mui/material/Typography'
import ErrorIcon from '@mui/icons-material/Error'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUserByIdAPI } from '~/apis/userApi'
import Footer from '~/components/Footer'
import Navbar from '~/components/NavBar/NavBar'
import { formatNumber } from '~/utils/formatVnd'
import formatVnpPayDate from '~/utils/formatVnPayDate'
import formatZaloPayDate from '~/utils/formatZaloPayDate'
import { addNewTicketAPI } from '~/apis/ticketApi'
function SuccessPayment() {
  const [avatar, setAvatar] = useState('')
  const userId = localStorage.getItem('userId')
  const [isFail, setIsFail] = useState(false)
  const [amount, setAmount] = useState(0)
  const [bank, setBank] = useState('')
  const [payDate, setPayDate] = useState('')
  const [tranNo, setTranNo] = useState('')
  const myListSeatString = localStorage.getItem('seatScheduleId')

  // Chuyển đổi chuỗi JSON trở lại thành mảng
  const myListSeat = JSON.parse(myListSeatString)
  const navigate = useNavigate()
  useEffect(() => {
    if (!userId) navigate('/login', { replace:true })
    const url = new URL(window.location.href)
    const searchParams = new URLSearchParams(url.search)
    const responseCode = searchParams.get('vnp_ResponseCode') || searchParams.get('status')
    if (responseCode.toString() !== '00' && responseCode.toString() !== '1') {
      setIsFail(true)
    }
    else {
      addNewTicketAPI({ userId: userId, seatScheduleId: myListSeat })
      const amount_res = (searchParams.get('vnp_Amount') / 100) || (searchParams.get('amount'))
      const bankCode = (searchParams.get('vnp_BankCode')) || ('Zalo Pay')
      const date_res = searchParams.get('vnp_PayDate') || searchParams.get('apptransid')
      const bankTranNo = searchParams.get('apptransid') || searchParams.get('vnp_BankTranNo')
      setAmount(amount_res)
      setBank(bankCode)
      if (responseCode.toString() === '00') {
        setPayDate(formatVnpPayDate(date_res))
      } else {
        setPayDate(formatZaloPayDate(date_res))
      }
      setTranNo(bankTranNo)
      getUserByIdAPI(userId)
        .then(res => {
          setAvatar(res.avatar)
        })
    }
  }, [userId, navigate])

  return (
    <Container maxWidth={false} sx={{ bgcolor:'#222831', height:'100vh' }} disableGutters>
      <Container disableGutters maxWidth={false} sx={{ bgcolor:'#1a1d29' }}>
        <Navbar avatar={avatar} />
        <Box sx={{ height:'100vh', bgcolor:'#1a1d29', color:'white' }}>
          <Box sx={{ color:'#1a1d29' }}>1</Box>
          <Box sx={{ color:'#1a1d29' }}>1</Box>
          <Box sx={{ color:'#1a1d29' }}>1</Box>
          <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', height:'50%', width: '100%' }}>
            <Box sx={{ alignItems:'center', justifyContent:'center', border:'1px solid white', p:'5px', borderRadius:'10px', width:500, minWidth:300, height:'70%' }} >
              <Box sx={{ alignItems:'center', justifyContent:'center', border:'1px solid white', p:'5px', borderRadius:'10px', maxWidth:700, minWidth:300, height:'100%' }}>
                {
                  isFail ? (
                    <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', color:'red', typography:'h4' }}>
                      <ErrorIcon sx={{ alignItems:'center', justifyContent:'center', color:'red' }} />
                      Thanh toán thất bại
                    </Box>
                  ) : (
                    <>
                      <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', color:'#63c132', typography:'h4' }}>
                        <CheckCircleIcon sx={{ alignItems:'center', justifyContent:'center', color:'#63c132', mr:1 }} fontSize='large' />
                        Thanh toán thành công
                      </Box>
                      <div style={{ borderBottom: '3px solid rgba(255, 255, 255, 0.5)', marginTop: 1, marginBottom:20 }}></div>
                      <Box sx={{ color: '#B4B4B8', display:'flex', gap:1, fontSize:20, mb:2 }}>Ngân hàng:{<Typography sx={{ color:'white', fontSize:18 }}>{bank}</Typography>}</Box>
                      <Box sx={{ color: '#B4B4B8', display:'flex', gap:1, fontSize:20, mb:2 }}>Số tiền:{<Typography sx={{ color:'white', fontSize:18 }}>{formatNumber(amount)} VNĐ</Typography>}</Box>
                      <Box sx={{ color: '#B4B4B8', display:'flex', gap:1, fontSize:20, mb:2 }}>Ngày thanh toán:{<Typography sx={{ color:'white', fontSize:18 }}>{payDate}</Typography>}</Box>
                      <Box sx={{ color: '#B4B4B8', display:'flex', gap:1, fontSize:20, mb:2 }}>Mã giao dịch:{<Typography sx={{ color:'white', fontSize:18 }}>{tranNo}</Typography>}</Box>
                    </>
                  )
                }
              </Box>
              <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', mt:2, borderRadius:'10px' }}>
                <Link to='/'>
                  <ListItemButton sx={{ color:'white', bgcolor:'green', borderRadius:'10px', ':hover' : { bgcolor: '#41B06E' } }}>
                    <KeyboardReturnIcon sx={{ color:'white', mr:1 }} />
                    <ListItemText primary="Home Page" />
                  </ListItemButton>
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
        <Footer />
      </Container>
    </Container>
  )
}

export default SuccessPayment