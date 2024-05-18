window.global ||= window

import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Order from './pages/OrderPage/Order'
import HomeAdmin from './admin/pages/HomeAdmin'
import Profile from './pages/Profile'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import RequireAuth from './pages/Auth/RequireAuth'
import RequireAuthAdmin from './pages/Auth/RequireAuthAdmin'
import NotfoundPage from './pages/NotfoundPage'
import DashBoard from '~/admin/pages/Dashboard'
import FilmManager from '~/admin/pages/FilmManager'
import CustomersManager from '~/admin/pages/CustomersManager'
import BranchsManager from '~/admin/pages/BranchsManager'
import SchedulesManager from '~/admin/pages/ScheduleManager'
import RoomsManager from '~/admin/pages/RoomsManager'
import BillsManager from '~/admin/pages/BillsManager'
import BillOfUserManager from '~/admin/pages/BillOfUserManager'
import AddNewSchedule from '~/admin/pages/AddNewSchedule'
import BranchSystem from './pages/BranchSystem'
import SuccessPayment from './pages/OrderPage/SuccessPayment'
import Rules from './pages/Rules'


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/order/:filmId" element={
          <RequireAuth>
            <Order/>
          </RequireAuth>
        }></Route>
        <Route path="/successPayment" element={
          <RequireAuth>
            <SuccessPayment/>
          </RequireAuth>
        }></Route>
        <Route path="/admin/" element={
          <RequireAuthAdmin>
            <HomeAdmin/>
          </RequireAuthAdmin>
        }>
          <Route index element={<DashBoard />}></Route>
          <Route path='movie' element={<FilmManager />}></Route>
          <Route path='customers' element={<CustomersManager />}></Route>
          <Route path='branchs' element={<BranchsManager />}></Route>
          <Route path='schedules' element={<SchedulesManager />}></Route>
          <Route path='rooms' element={<RoomsManager />}></Route>
          <Route path='bills/schedule/:scheduleId' element={<BillsManager />}></Route>
          <Route path='bills/user/:userId' element={<BillOfUserManager />}></Route>
          <Route path='add/schedule' element={<AddNewSchedule />}></Route>
        </Route>
        <Route path='/profile' element={ <RequireAuth>
          <Profile/>
        </RequireAuth>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/branchs' element={<BranchSystem/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/rules' element={<Rules/>}></Route>
        <Route path='*' element={<NotfoundPage/>}></Route>
      </Routes>
    </>
  )
}

export default App
