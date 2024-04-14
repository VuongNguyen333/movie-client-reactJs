import Joi from 'joi'
export const JoiObjectRoomAddNew = Joi.object({
  name: Joi.string().required(),
  status: Joi.boolean().required('status is required'),
  photo: Joi.object().invalid({}).messages({ 'string.pattern.base': 'File Image is required' }).required()
})