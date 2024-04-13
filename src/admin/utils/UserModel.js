import Joi from 'joi'
export const JoiObjectUser = Joi.object({
  fullName: Joi.string().required('Name is required'),
  email: Joi.string().required('Email is required').email({ tlds: { allow: false } }),
  dob: Joi.string().required('Date of birth is required'),
  avatar: Joi.object().required('Avatar is required'),
  roles: Joi.array().required()
})