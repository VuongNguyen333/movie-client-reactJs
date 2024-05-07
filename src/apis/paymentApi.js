import axios from 'axios'
import { toast } from 'react-toastify'
import { getHeader } from '~/utils/apiFunc'
import { API_ROOT } from '~/utils/constant'

export const createPaymentAPI = async (formData) => {
  try {
    const res = await axios.post(`${API_ROOT}/payment/vnpay/create_payment`, formData, { headers: getHeader() })
    // console.log('🚀 ~ addNewMovieAPI ~ res:', res)
    // toast.success('Order Successfully!')
    return res.data
  } catch (error) {
    toast.error(error.response.data)
  }
}
