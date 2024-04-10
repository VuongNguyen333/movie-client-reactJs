import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Order from './pages/OrderPage/Order'
import HomeAdmin from './admin/pages/HomeAdmin'
import FilmManager from './admin/pages/FilmManager'
import DashBoard from '~/admin/pages/Dashboard'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/order/:filmId/:filmName" element={<Order />}>
        </Route>
        <Route path="/admin/*" element={<HomeAdmin />}>
        </Route>
      </Routes>
    </>
  )
}

export default App
