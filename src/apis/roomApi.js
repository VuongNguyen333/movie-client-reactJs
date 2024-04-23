import axios from 'axios'
import { toast } from 'react-toastify'
import { API_ROOT } from '~/utils/constant'

export const getAllRoomByBranchIdAPI = async (branchId) => {
  try {
    const res = await axios.get(`${API_ROOT}/rooms/all/${branchId}`)
    // lay data qua property data cua axios
    // console.log('🚀 ~ addNewMovieAPI ~ res:', res)
    return res.data
  } catch (error) {
    console.log(error)
  }
}
export const getRoomByIdAPI = async (id) => {
  try {
    const res = await axios.get(`${API_ROOT}/rooms/${id}`)
    // lay data qua property data cua axios
    // console.log('🚀 ~ addNewMovieAPI ~ res:', res)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const updateRoomAPI = async (data, roomId) => {
  try {
    const res = await axios.put(`${API_ROOT}/rooms/update/${roomId}`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
    // console.log('🚀 ~ addNewMovieAPI ~ res:', res)
    toast.success('Update Successfully!')
    return res.data
  } catch (error) {
    toast.error(error.response.data)
  }
}

export const addNewRoomAPI = async (data, branchId) => {
  try {
    const res = await axios.post(`${API_ROOT}/rooms/addNew/${branchId}`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
    // console.log('🚀 ~ addNewMovieAPI ~ res:', res)
    toast.success('Create Successfully!')
    return res.data
  } catch (error) {
    toast.error(error.response.data)
  }
}