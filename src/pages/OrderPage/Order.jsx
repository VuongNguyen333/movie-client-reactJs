import MainOrder from './MainOrder'
import Footer from '~/components/Footer'
import AppBarCustom from '~/components/AppBar/AppBar'
import { Container } from '@mui/material'

export default function Order() {
  return (
    <Container disableGutters maxWidth={false}>
      <AppBarCustom />
      <MainOrder />
      <Footer />
    </Container>
  )
}