/* eslint-disable no-console */
import { toast } from 'react-toastify'
import { addNewBranchAPI, updateBranchAPI } from '~/apis/branchApi'
import { addNewMovieAPI, updateMovieByIdAPI } from '~/apis/movieApi'
import { addNewRoomAPI, updateRoomAPI } from '~/apis/roomApi'
import { convertFile } from './fileToBob'
import { updateUserByIdAPI } from '~/apis/userApi'
import { updateScheduleByIdAPI } from '~/apis/scheduleApi'

export const validate = async(validData, data) => {
  const res = await validData.validateAsync(data, { abortEarly: 'false' })
  return res
}

export const validateBeforeSubmit = async ( validObject, data, handleSetFormData, handleAddNew, handleUpdate, handleUpdateFilm) => {
  try {
    await validate(validObject, data)
    if (handleAddNew) {
      addNewMovieAPI(data).then(ressult => {
        if (ressult) {
          handleSetFormData()
          handleAddNew(ressult)
        }
      })
    }
    if (handleUpdate) {
      updateMovieByIdAPI(data, data.id).then(film => {
        if (film) {
          handleUpdate(film)
          // console.log('🚀 ~ updateMovieById ~ res:', film)
          handleUpdateFilm(film)
        }
      })
    }
    // console.log('🚀 ~ validateBeforeSubmit ~ res:', res)
  } catch (err) {
    // console.log('🚀 ~ validateBeforeSubmit ~ err:', err)
    toast.error(err.message)
  }
}

export const validateBeforeSubmitBranch = async ( validObject, data, handleSetFormData, handleAddNew, handleUpdate, handleUpdateBranch) => {
  try {
    const res = await validate(validObject, data)
    if (handleSetFormData) {
      handleSetFormData()
    }
    if (handleAddNew) {
      const areaId = data.area
      delete data.area
      addNewBranchAPI(data, areaId).then(res => {
        if (res) {
          console.log('🚀 ~ validateBeforeSubmitBranch ~ res:', res)
          handleAddNew(res)
        }
      })
    }
    if (!handleAddNew && handleUpdate) {
      const newData = { ...data }
      const branchId = data.id
      delete newData.id
      delete newData.area
      try {
        const file = await convertFile(data.photo)
        newData.photo = file
      } catch (error) {
        newData.photo = new File([], 'empty_file.txt', { type: 'text/plain' })
      }
      updateBranchAPI(newData, branchId).then(branch => {
        if (branch) {
          handleUpdate(branch)
          handleUpdateBranch(branch)
        }
      })
    }
    console.log('🚀 ~ validateBeforeSubmit ~ res:', res)
  } catch (err) {
    console.log('🚀 ~ validateBeforeSubmit ~ err:', err)
    toast.error(err.message)
  }
}
export const validateBeforeSubmitRoom = async ( validObject, branchId, data, handleSetFormData, handleAddNew, handleUpdate, handleUpdateRoom) => {
  try {
    const res = await validate(validObject, data)
    if (handleAddNew) {
      data.photo = await convertFile(data.photo)
      addNewRoomAPI(data, branchId).then(res => {
        if (res) {
          handleAddNew(res)
          handleSetFormData()
        }
      })
    }
    if (handleUpdate) {
      const newData = { ...data }
      const roomId = data.id
      delete newData.id
      try {
        const file = await convertFile(data.photo)
        newData.photo = file
      } catch (error) {
        newData.photo = new File([], 'empty_file.txt', { type: 'text/plain' })
      }
      console.log('🚀 ~ validateBeforeSubmitRoom ~ newData:', newData)
      updateRoomAPI(newData, roomId).then(room => {
        if (room) {
          handleUpdate(room)
          handleUpdateRoom(room)
        }
      })
    }
    console.log('🚀 ~ validateBeforeSubmit ~ res:', res)
  } catch (err) {
    console.log('🚀 ~ validateBeforeSubmit ~ err:', err)
    toast.error(err.message)
  }
}

export const validateBeforeSubmitUser = async ( validObject, data, handleUpdate, handleUpdateUser) => {
  try {
    await validate(validObject, data)
    if (handleUpdateUser) {
      const newData = { ...data }
      delete newData.id
      newData.email = ''
      newData.fullName = ''
      try {
        const file = await convertFile(data.avatar)
        newData.photo = file
      } catch (error) {
        newData.photo = new File([], 'empty_file.txt', { type: 'text/plain' })
      }
      updateUserByIdAPI(newData, data.id).then(resData => {
        if (resData) {
          handleUpdate(resData)
          handleUpdateUser(resData)
        }
      })
      // console.log('🚀 ~ validateBeforeSubmitUser ~ newData:', newData)
    }
    // console.log('🚀 ~ validateBeforeSubmit ~ res:', res)
  } catch (err) {
    // console.log('🚀 ~ validateBeforeSubmit ~ err:', err)
    toast.error(err.message)
  }
}

export const validateBeforeSubmitSchedule= async ( validObject, data, handleUpdate, handleUpdateSchedule) => {
  try {
    await validate(validObject, data)
    if (handleUpdate) {
      const newData = { ...data }
      delete newData.id
      updateScheduleByIdAPI(newData, data.id).then(resData => {
        if (resData) {
          console.log('🚀 ~ updateScheduleByIdAPI ~ resData:', resData)
          handleUpdate(resData)
          handleUpdateSchedule(resData)
        }
      })
      // console.log('🚀 ~ validateBeforeSubmitUser ~ newData:', newData)
    }
  } catch (err) {
    toast.error(err.message)
  }
}

