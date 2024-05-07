import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserByIdAPI } from '~/apis/userApi'
import Footer from '~/components/Footer'
import Navbar from '~/components/NavBar/NavBar'
function SuccessPayment() {
  const [avatar, setAvatar] = useState('')
  const userId = localStorage.getItem('userId')
  const navigate = useNavigate()
  useEffect(() => {
    if (!userId) navigate('/login', { replace:true })
    getUserByIdAPI(userId)
      .then(res => {
        setAvatar(res.avatar)
      })
  }, [userId])

  return (
    <Container maxWidth={false} sx={{ bgcolor:'#222831', height:'100vh' }} disableGutters>
      <Container disableGutters maxWidth={false} sx={{ bgcolor:'#1a1d29' }}>
        <Navbar avatar={avatar} />
        <Box sx={{ height:'100vh', bgcolor:'#1a1d29', color:'white' }}>
          <Box sx={{ color:'#1a1d29' }}>1</Box>
          <Box sx={{ color:'#1a1d29' }}>1</Box>
          <Box sx={{ color:'#1a1d29' }}>1</Box>
          <Box>Thanh cong!!</Box>
        </Box>
        <Footer />
      </Container>
    </Container>
  )
}

export default SuccessPayment