import Joi from 'joi';
import { validSortFields, validOrderValues } from '../lib/constants';

export const paramsSchema = Joi.object({
  userId: Joi.number().integer().positive().required(),
  sortBy: Joi.string().valid(...validSortFields).optional(),
  order: Joi.string().valid(...validOrderValues).optional(),
  search: Joi.string().pattern(/^[a-zA-Z]+$/).allow('').optional(),
  limit: Joi.number().integer().min(1).max(30).default(10).optional(),
  page: Joi.number().integer().min(1).default(1).optional()
});