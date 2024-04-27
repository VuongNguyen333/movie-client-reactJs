import axios from 'axios'
import { toast } from 'react-toastify'
import { getHeader } from '~/utils/apiFunc'
import { API_ROOT } from '~/utils/constant'

export const addNewBranchAPI = async (data, areaId) => {
  try {
    const res = await axios.post(`${API_ROOT}/branches/addNew/${areaId}`, data, { headers: getHeader() })
    // lay data qua property data cua axios
    // console.log('🚀 ~ addNewMovieAPI ~ res:', res)
    toast.success('Create Successfully!')
    return res.data
  } catch (error) {
    toast.error(error.response.data)
  }
}

export const getListBranchByAreaIdAPI = async (areaId) => {
  try {
    const res = await axios.get(`${API_ROOT}/branches/all/${areaId}`, { headers: getHeader() })
    // lay data qua property data cua axios
    // console.log('🚀 ~ addNewMovieAPI ~ res:', res)
    return res.data
  } catch (error) {
    return
  }
}
export const getBranchbyIdAPI = async (id) => {
  try {
    const res = await axios.get(`${API_ROOT}/branches/${id}`, { headers: getHeader() })
    // lay data qua property data cua axios
    // console.log('🚀 ~ addNewMovieAPI ~ res:', res)
    return res.data
  } catch (error) {
    return
  }
}
export const getListBranchAPI = async () => {
  try {
    const res = await axios.get(`${API_ROOT}/branches/all`, { headers: getHeader() })
    // lay data qua property data cua axios
    // console.log('🚀 ~ addNewMovieAPI ~ res:', res)
    return res.data
  } catch (error) {
    return null
  }
}
export const getListBranchClientAPI = async (movieId, areaId) => {
  try {
    const res = await axios.get(`${API_ROOT}/branches/all/client/movieAndArea/${movieId}/${areaId}`, { headers: getHeader() })
    // lay data qua property data cua axios
    // console.log('🚀 ~ addNewMovieAPI ~ res:', res)
    return res.data
  } catch (error) {
    return null
  }
}
export const updateBranchAPI = async (data, branchId) => {
  try {
    const res = await axios.put(`${API_ROOT}/branches/update/${branchId}`, data, { headers: getHeader() } )
    // console.log('🚀 ~ addNewMovieAPI ~ res:', res)
    toast.success('Update Successfully!')
    return res.data
  } catch (error) {
    toast.error(error.response.data)
    return
  }
}

