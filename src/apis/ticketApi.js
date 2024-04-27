import axios from 'axios'
import { toast } from 'react-toastify'
import { getHeader } from '~/utils/apiFunc'
import { API_ROOT } from '~/utils/constant'

export const addNewTicketAPI = async (formData) => {
  try {
    const res = await axios.post(`${API_ROOT}/tickets/addNew`, formData, { headers: getHeader() })
    // console.log('🚀 ~ addNewMovieAPI ~ res:', res)
    toast.success('Order Successfully!')
    return res.data
  } catch (error) {
    toast.error(error.response.data)
  }
}
export const getListTicketByBillIdAPI = async (billId) => {
  try {
    const res = await axios.get(`${API_ROOT}/tickets/all/bill/${billId}`, { headers: getHeader() })
    // lay data qua property data cua axios
    // console.log('🚀 ~ addNewMovieAPI ~ res:', res)
    return res.data
  } catch (error) {
    return
  }
}