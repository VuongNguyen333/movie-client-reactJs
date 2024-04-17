import { toast } from 'react-toastify'

export const validate = async(validData, data) => {
  const res = await validData.validateAsync(data, { abortEarly: 'false' })
  return res
}

export const validateBeforeSubmit = async ( validObject, data, handleSetFormData) => {
  try {
    const res = await validate(validObject, data)
    if (handleSetFormData) {
      handleSetFormData()
    }
    console.log('🚀 ~ validateBeforeSubmit ~ res:', res)
    toast.success('Succesfully')
  } catch (err) {
    toast.error(err.message)
  }
}