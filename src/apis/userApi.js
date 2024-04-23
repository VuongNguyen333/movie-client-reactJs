import axios from 'axios'
import { toast } from 'react-toastify'
import { API_ROOT } from '~/utils/constant'

export const getListUserAPI = async () => {
  try {
    const res = await axios.get(`${API_ROOT}/users/all`)
    // lay data qua property data cua axios
    // console.log('🚀 ~ addNewMovieAPI ~ res:', res)
    return res.data
  } catch (error) {
    return
  }
}
export const getUserByIdAPI = async (userId) => {
  try {
    const res = await axios.get(`${API_ROOT}/users/${userId}`)
    // lay data qua property data cua axios
    // console.log('🚀 ~ addNewMovieAPI ~ res:', res)
    return res.data
  } catch (error) {
    return
  }
}
export const updateUserByIdAPI = async (data, userId) => {
  try {
    const res = await axios.put(`${API_ROOT}/users/update/admin/${userId}`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
    // lay data qua property data cua axios
    // console.log('🚀 ~ addNewMovieAPI ~ res:', res)
    toast.success('Update Successfully!')
    return res.data
  } catch (error) {
    toast.error(error.response.data)
  }
}