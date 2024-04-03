import MainOrder from './MainOrder'
import Footer from '~/components/Footer'
import AppBarCustom from '~/components/Appbar/AppBar'

export default function Order() {
  return (
    <div>
      <AppBarCustom />
      <MainOrder />
      <Footer />
    </div>
  )
}