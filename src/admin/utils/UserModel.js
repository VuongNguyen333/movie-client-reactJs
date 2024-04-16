import Joi from 'joi'
export const JoiObjectUser = Joi.object({
  fullName: Joi.string().required().messages({ 'any.required':'Name is required'}).allow(null),
  email: Joi.string().required('Email is required').email({ tlds: { allow: false } }).allow(null),
  dob: Joi.string().required('Date of birth is required').allow(null),
  avatar: Joi.object().required('Avatar is required').allow(null),
  roles: Joi.array().required()
})