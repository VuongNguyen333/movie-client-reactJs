import Joi from 'joi'
export const JoiObjectFilm = Joi.object({
  name: Joi.string().required('Name is required'),
  actor: Joi.string().required('Actor is required'),
  director:Joi.string().required('Director is required'),
  trailerURL: Joi.string().required('TrailerURL is required'),
  description: Joi.string().required('Description is required'),
  duration: Joi.number().required('Duration is required'),
  language: Joi.string().required('Language is required'),
  category: Joi.string().required('Category is required'),
  releaseDate: Joi.string().required('Release Date is required'),
  photo: Joi.object().allow(null)
})
export const JoiObjectFilmAddNew = Joi.object({
  name: Joi.string().required('Name is required'),
  actor: Joi.string().required('Actor is required'),
  director:Joi.string().required('Director is required'),
  trailerURL: Joi.string().required('TrailerURL is required'),
  description: Joi.string().required('Description is required'),
  duration: Joi.number().required('Duration is required'),
  language: Joi.string().required('Language is required'),
  category: Joi.string().required('Category is required'),
  releaseDate: Joi.string().invalid('undefined/undefined/').required('Release Date is required').empty('').trim(),
  photo: Joi.object().invalid({}).required('File is required')
})