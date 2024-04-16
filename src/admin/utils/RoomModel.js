import Joi from 'joi'
export const JoiObjectRoomAddNew = Joi.object({
  name: Joi.string().label('Name').error(new Error('Name is required')),
  status: Joi.boolean().error(new Error('Status is required')),
  photo: Joi.object().invalid({}).error(new Error('Photo is required'))
})
export const JoiObjectRoomUpdate = Joi.object({
  name: Joi.string(),
  status: Joi.boolean(),
  photo: Joi.object()
})