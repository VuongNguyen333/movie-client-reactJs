import MainOrder from './MainOrder'
import Footer from '~/components/Footer'
import ResponsiveAppBar from '~/components/AppBar/AppBar'
import { Box } from '@mui/material'

export default function Order() {
  return (
    <div>
      <ResponsiveAppBar />
      <MainOrder />
      <Footer />
    </div>
  )
}