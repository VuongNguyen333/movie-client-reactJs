import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Order from './pages/OrderPage/Order'
import HomeAdmin from './admin/pages/HomeAdmin'
import Profile from './pages/Profile/Profile'

function App() {

  return (
    <>
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="/order/:filmId/:filmName" element={<Order />}></Route>
        <Route path="/admin/*" element={<HomeAdmin />}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
      </Routes>
    </>
  )
}

export default App
