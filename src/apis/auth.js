import axios from 'axios'
import { toast } from 'react-toastify'
import { API_ROOT } from '~/utils/constant'

export const resetPasswordAPI = async (data) => {
  try {
    const res = await axios.put(`${API_ROOT}/auth/resetPassword`, data)
    // lay data qua property data cua axios
    // console.log('🚀 ~ addNewMovieAPI ~ res:', res)
    return res.data
  } catch (error) {
    return
  }
}
export const loginAPI = async (data) => {
  try {
    const res = await axios.post(`${API_ROOT}/auth/login`, data)
    // lay data qua property data cua axios
    // console.log('🚀 ~ addNewMovieAPI ~ res:', res)
    return res.data
  } catch (error) {
    toast.error(error.response.data)
    return null
  }
}
export const registerAPI = async (data) => {
  try {
    const res = await axios.post(`${API_ROOT}/auth/registerUser`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
    // lay data qua property data cua axios
    // console.log('🚀 ~ addNewMovieAPI ~ res:', res)
    return res.data
  } catch (error) {
    toast.error(error.response.data)
    return null
  }
}