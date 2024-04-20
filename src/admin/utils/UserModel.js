import Joi from 'joi'
export const JoiObjectUser = Joi.object({
  id: Joi.number(),
  fullName: Joi.string().allow(null),
  email: Joi.string().allow(null),
  dob: Joi.string(),
  avatar: Joi.object().allow(null),
  rolesId: Joi.array().required().error(new Error('Roles is required'))
})