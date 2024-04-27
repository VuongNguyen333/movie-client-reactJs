import MainOrder from './MainOrder'
import Footer from '~/components/Footer'
import AppBarCustom from '~/components/AppBar/AppBar'
import { Container } from '@mui/material'
import { useEffect, useState } from 'react'
import { getUserByIdAPI } from '~/apis/userApi'

export default function Order() {
  const [user, setUser] = useState(null)
  const userId = localStorage.getItem('userId')
  useEffect(() => {
    getUserByIdAPI(userId).then(res => setUser(res))
  }, [userId])

  return (
    <Container disableGutters sx={{ height: '100vh' }} maxWidth={false}>
      <AppBarCustom avatar={user?.avatar} />
      <MainOrder />
      <Footer />
    </Container>
  )
}