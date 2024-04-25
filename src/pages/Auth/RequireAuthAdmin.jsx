/* eslint-disable no-unused-vars */
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import NotfoundPage from '../NotfoundPage'

const RequireAuthAdmin = ({ children }) => {
  const user=localStorage.getItem('userId')
  const roles = localStorage.getItem('userRole')
  const location=useLocation()
  if (roles && !roles.includes('ROLE_ADMIN') || !roles) {
    // toast.warning('Please Login before!')
    return <NotfoundPage />
  }
  if (!user) return <NotfoundPage/>
  return children
}

export default RequireAuthAdmin