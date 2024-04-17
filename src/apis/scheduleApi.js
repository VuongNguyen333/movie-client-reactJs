import axios from 'axios'
import { toast } from 'react-toastify'
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
export const getScheduleById = async (id) => {
  try {
    const res = await axios.get(`${API_ROOT}/schedules/${id}`)
    // lay data qua property data cua axios
    // console.log('🚀 ~ addNewMovieAPI ~ res:', res)
    return res.data
  } catch (error) {
    return
  }
}