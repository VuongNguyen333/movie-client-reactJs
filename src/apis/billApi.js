import axios from 'axios'
import { toast } from 'react-toastify'
import { getHeader } from '~/utils/apiFunc'
import { API_ROOT } from '~/utils/constant'

export const getListBillByScheduleIdAPI = async (scheduleId) => {
  try {
    const res = await axios.get(`${API_ROOT}/bills/all/schedule/${scheduleId}`, { headers: getHeader() })
    // lay data qua property data cua axios
    // console.log('🚀 ~ addNewMovieAPI ~ res:', res)
    return res.data
  } catch (error) {
    return
  }
}
export const getListBillByUserIdAPI = async (userId) => {
  try {
    const res = await axios.get(`${API_ROOT}/bills/all/user/${userId}`, { headers: getHeader() })
    // lay data qua property data cua axios
    // console.log('🚀 ~ addNewMovieAPI ~ res:', res)
    return res.data
  } catch (error) {
    return
  }
}
export const getListBillStatisticIdAPI = async (data) => {
  try {
    const res = await axios.post(`${API_ROOT}/statistics/Date_MovieId_BranchId`, data, { headers: getHeader() })
    // lay data qua property data cua axios
    // console.log('🚀 ~ addNewMovieAPI ~ res:', res)
    return res.data
  } catch (error) {
    return
  }
}

