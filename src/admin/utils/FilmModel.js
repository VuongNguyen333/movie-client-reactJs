import Joi from 'joi'
export const JoiObjectFilm = Joi.object({
  id: Joi.number().required().error(new Error('Id is required')),
  name: Joi.string().required().error(new Error('Id is required')),
  actor: Joi.string().required().error(new Error('Id is required')),
  director:Joi.string().required().error(new Error('Id is required')),
  trailerURL: Joi.string().required().error(new Error('Id is required')),
  description: Joi.string().required().error(new Error('Id is required')),
  duration: Joi.number().error(new Error('Duration must be a number')).required(),
  language: Joi.string().required().error(new Error('Id is required')),
  category: Joi.string().required().error(new Error('Id is required')),
  releaseDate: Joi.string().required().error(new Error('Id is required')),
  photo: Joi.object().allow(null)
})
export const JoiObjectFilmAddNew = Joi.object({
  name: Joi.string().required(),
  actor: Joi.string().required(),
  director:Joi.string().required('Director is required'),
  trailerURL: Joi.string().required(),
  description: Joi.string().required(),
  duration: Joi.number().error(new Error('Duration must be a number')).required(),
  language: Joi.string().required().error(new Error('Language is required')),
  category: Joi.string().required().error(new Error('Category is required')),
  releaseDate: Joi.string().invalid('undefined--undefined').error(new Error('Release Date is required')).required().empty('').trim(),
  photo: Joi.object().invalid({}).error(new Error('Photo is required')).required().error(new Error('Photo is required'))
})