import MainOrder from './MainOrder'
import Footer from '~/components/Footer'
import AppBarCustom from '~/components/Appbar/AppBar'
import { Container } from '@mui/material'

export default function Order() {
  return (
    <Container disableGutters sx={{ height: '100vh' }} maxWidth={false}>
      <AppBarCustom />
      <MainOrder />
      <Footer />
    </Container>
  )
}