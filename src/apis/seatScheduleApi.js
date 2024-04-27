import axios from 'axios'
import { toast } from 'react-toastify'
import { getHeader } from '~/utils/apiFunc'
import { API_ROOT } from '~/utils/constant'

export const getListSeatAPI = async (scheduleId) => {
  try {
    const res = await axios.get(`${API_ROOT}/seat_schedule/get/${scheduleId}`, { headers: getHeader() })
    // lay data qua property data cua axios
    // console.log('🚀 ~ addNewMovieAPI ~ res:', res)
    return res.data
  } catch (error) {
    return
  }
}