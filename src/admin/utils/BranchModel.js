import Joi from 'joi'
export const JoiObjectBranchUpdate = Joi.object({
  name: Joi.string().required().error(new Error('Name is required')),
  address: Joi.string().required().error(new Error('Address is required')),
  introduction: Joi.string().regex(/^[0-9]{10}$/).error(new Error('Phone number must have 10 digits.')).required().error(new Error('Introduction is required')),
  area: Joi.string().required().error(new Error('Area is required')),
  photo: Joi.object().allow(null)
})
export const JoiObjectBranchAddNew = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  introduction: Joi.string().regex(/^[0-9]{10}$/).error(new Error('Phone number must have 10 digits.')).required(),
  area: Joi.string().error(new Error('Area is required')),
  photo: Joi.object().invalid({}).error(new Error('Photo is required')).required()
})