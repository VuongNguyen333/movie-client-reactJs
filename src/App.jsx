import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MainOrder from './pages/OrderPage/MainOrder'

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/order" element={<MainOrder />} />
    </Routes>
  )
}

export default App
