import axios from 'axios'
import { toast } from 'react-toastify'
import { API_ROOT } from '~/utils/constant'

// khong try catch nhieu` ma` dung` interceptor trong axios
//interceptor danh chan. vao` giua req va res
export const addNewMovieAPI = async (data) => {
  try {
    const res = await axios.post(`${API_ROOT}/movies/addNew`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
    // lay data qua property data cua axios
    // console.log('🚀 ~ addNewMovieAPI ~ res:', res)
    toast.success('Create Successfully!')
    return res.data
  } catch (error) {
    return
  }
}

export const getMovieAPI = async () => {
  try {
    const res = await axios.get(`${API_ROOT}/movies/all/client`)
    // lay data qua property data cua axios
    // console.log('🚀 ~ addNewMovieAPI ~ res:', res)
    return res.data
  } catch (error) {
    return
  }
}
export const getMovieByIdAPI = async (movieId) => {
  try {
    const res = await axios.get(`${API_ROOT}/movies/${movieId}`)
    // lay data qua property data cua axios
    // console.log('🚀 ~ addNewMovieAPI ~ res:', res)
    return res.data
  } catch (error) {
    return
  }
}