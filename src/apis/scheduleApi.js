import axios from 'axios'
import { toast } from 'react-toastify'
import { convertDate } from '~/admin/utils/convertDate'
import { API_ROOT } from '~/utils/constant'

export const getListScheduleByBranchIdAndMovieIdAPI = async (branchId, movieId) => {
  try {
    const res = await axios.get(`${API_ROOT}/schedules/all/client/BranchAndMovie/${branchId}/${movieId}`)
    // lay data qua property data cua axios
    // console.log('🚀 ~ addNewMovieAPI ~ res:', res)
    return res.data
  } catch (error) {
    return
  }
}
export const getScheduleByIdAPI = async (id) => {
  try {
    const res = await axios.get(`${API_ROOT}/schedules/${id}`)
    // lay data qua property data cua axios
    // console.log('🚀 ~ addNewMovieAPI ~ res:', res)
    return res.data
  } catch (error) {
    return
  }
}
export const getScheduleByRoomIdAPI = async (roomId) => {
  try {
    const res = await axios.get(`${API_ROOT}/schedules/all/room/${roomId}`)
    // lay data qua property data cua axios
    // console.log('🚀 ~ addNewMovieAPI ~ res:', res)
    return res.data
  } catch (error) {
    return
  }
}
export const getScheduleByMovieIdAPI = async (movieId) => {
  try {
    const res = await axios.get(`${API_ROOT}/schedules/all/movie/${movieId}`)
    // lay data qua property data cua axios
    // console.log('🚀 ~ addNewMovieAPI ~ res:', res)
    return res.data
  } catch (error) {
    return
  }
}
export const getScheduleByMovieIdAndRoomIdAPI = async (data) => {
  try {
    const formData = new FormData()
    formData.append('movieId', data.movieId)
    formData.append('roomId', data.roomId)
    formData.append('startDate', convertDate.convertToRequest(data.startDate))
    const res = await axios.post(`${API_ROOT}/schedules/getSchedulesByRoomIdDate`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    // lay data qua property data cua axios
    // console.log('🚀 ~ addNewMovieAPI ~ res:', res)
    return res.data
  } catch (error) {
    return
  }
}
export const addNewScheduleByMovieIdAndRoomIdAPI = async (data) => {
  try {
    const formData = new FormData()
    formData.append('startDate', data.startDate)
    formData.append('startTime', data.startTime)
    const res = await axios.post(`${API_ROOT}/schedules/addNew/${data.movieId}/${data.roomId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    // lay data qua property data cua axios
    // console.log('🚀 ~ addNewMovieAPI ~ res:', res)
    toast.success('Create Successfully!')
    return res.data
  } catch (error) {
    return
  }
}
export const updateScheduleByIdAPI = async (data, scheduleId) => {
  try {
    const res = await axios.put(`${API_ROOT}/schedules/update/${scheduleId}`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
    // lay data qua property data cua axios
    // console.log('🚀 ~ addNewMovieAPI ~ res:', res)
    toast.success('Update Successfully!')
    return res.data
  } catch (error) {
    return
  }
}

