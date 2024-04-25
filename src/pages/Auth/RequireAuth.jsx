/* eslint-disable no-unused-vars */
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

const RequireAuth = ({ children }) => {
  const user=localStorage.getItem('userId')
  const location=useLocation()
  if (!user) {
    toast.warning('Please Login before!')
    return <Navigate to={'/login'} state={{ path:location.pathname }}/>
  }
  return children
}

export default RequireAuth