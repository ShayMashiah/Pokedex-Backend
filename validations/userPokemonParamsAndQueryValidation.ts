import Joi from 'joi';
import { validSortFields, validOrderValues } from '../lib/constants';

export const paramsSchema = Joi.object({
  userId: Joi.number().integer().positive().required(),
  sortBy: Joi.string().valid(...validSortFields).optional(),
  order: Joi.string().valid(...validOrderValues).optional(),
  search: Joi.string().pattern(/^[a-zA-Z]+$/).allow('').optional()
});