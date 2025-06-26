import Joi from 'joi';
import { validSortFields, validOrderValues } from '../lib/constants';

export const pokemonsParamsSchema = Joi.object({
  sortBy: Joi.string().valid(...validSortFields).optional(),
  order: Joi.string().valid(...validOrderValues).optional(),
  search: Joi.string().pattern(/^[a-zA-Z\s\-']*$/).optional().allow(''),
  limit: Joi.number().integer().min(1).max(30).optional(),
  page: Joi.number().integer().min(1).optional()
});