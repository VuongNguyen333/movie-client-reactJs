import axios from 'axios'
import { toast } from 'react-toastify'
import { API_ROOT } from '~/utils/constant'

export const getListBillByScheduleIdAPI = async (scheduleId) => {
  try {
    const res = await axios.get(`${API_ROOT}/bills/all/schedule/${scheduleId}`)
    // lay data qua property data cua axios
    // console.log('🚀 ~ addNewMovieAPI ~ res:', res)
    return res.data
  } catch (error) {
    return
  }
}
export const getListBillByUserIdAPI = async (userId) => {
  try {
    const res = await axios.get(`${API_ROOT}/bills/all/user/${userId}`)
    // lay data qua property data cua axios
    // console.log('🚀 ~ addNewMovieAPI ~ res:', res)
    return res.data
  } catch (error) {
    return
  }
}
