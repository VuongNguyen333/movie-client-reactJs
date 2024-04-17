import Joi from 'joi'
export const JoiObjectScheduleSearch = Joi.object({
  startDate: Joi.string().required().error(new Error('Date is required')).invalid('undefined-undefined-').error(new Error('Date is required')),
  movieId: Joi.string().required().error(new Error('Film is required')),
  branchId: Joi.string().required().error(new Error('Branch is required'))
})