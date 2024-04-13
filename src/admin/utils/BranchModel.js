import Joi from 'joi'
export const JoiObjectBranchUpdate = Joi.object({
  name: Joi.string().required('Name is required'),
  address: Joi.string().required('Address is required'),
  introduction: Joi.string().required('Introduction of birth is required'),
  area: Joi.string().required('Area is required'),
  photo: Joi.object().allow(null)
})
export const JoiObjectBranchAddNew = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required('Address is required'),
  introduction: Joi.string().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': 'Phone number must have 10 digits.' }).required(),
  area: Joi.string().required('Area is required'),
  photo: Joi.object().invalid({}).messages({ 'string.pattern.base': 'File Image is required' }).required()
})