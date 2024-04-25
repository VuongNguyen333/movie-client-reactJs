import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Order from './pages/OrderPage/Order'
import HomeAdmin from './admin/pages/HomeAdmin'
import Profile from './pages/Profile'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import RequireAuth from './pages/Auth/RequireAuth'
import RequireAuthAdmin from './pages/Auth/RequireAuthAdmin'

function App() {

  return (
    <>
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="/order/:filmId/:filmName" element={
          <RequireAuth>
            <Order/>
          </RequireAuth>
        }></Route>
        <Route path="/admin/*" element={
          <RequireAuthAdmin>
            <HomeAdmin/>
          </RequireAuthAdmin>
        }>
        </Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
      </Routes>
    </>
  )
}

export default App
