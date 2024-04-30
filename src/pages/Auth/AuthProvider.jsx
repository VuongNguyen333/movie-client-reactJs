/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
export const AuthContext=createContext({
  user: null,
  handleLogin:(token) => {},
  handleLogout:() => {}
})
const AuthProvider = ({ children }) => {
  const [user, setUser]=useState(null)
  const handleLogin=(token, userId) => {
    const decodedUser=jwtDecode(token)
    // console.log('🚀 ~ handleLogin ~ decodedUser:', decodedUser)
    localStorage.setItem('userId', userId)
    localStorage.setItem('userRole', decodedUser.roles)
    localStorage.setItem('token', token)
    setUser(decodedUser)
  }
  const handleLogout=() => {
    localStorage.removeItem('userId')
    localStorage.removeItem('userRole')
    localStorage.removeItem('token')
    setUser(null)
    window.location.href = 'http://localhost:5173'
  }
  return (
    <div>
      <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
        {children}
      </AuthContext.Provider>
    </div>
  )
}
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth=() => {
  return useContext(AuthContext)
}
export default AuthProvider