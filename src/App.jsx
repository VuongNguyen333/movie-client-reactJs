import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Order from './pages/OrderPage/Order'

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/order/:filmId/:filmName" element={<Order />} />
    </Routes>
  )
}

export default App
