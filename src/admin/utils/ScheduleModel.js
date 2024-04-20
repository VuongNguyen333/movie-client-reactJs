import Joi from 'joi'
export const JoiObjectScheduleSearch = Joi.object({
  startDate: Joi.string().required().error(new Error('Date is required')).invalid('undefined-undefined-').error(new Error('Date is required')),
  movieId: Joi.number().required().error(new Error('Film is required')),
  branchId: Joi.number().required().error(new Error('Branch is required'))
})
export const JoiObjectScheduleUpdate= Joi.object({
  id: Joi.number(),
  startDate: Joi.string().required().error(new Error('Date is required')).invalid('undefined-undefined-').error(new Error('Date is required')),
  startTime: Joi.string().required().error(new Error('Film is required'))
})