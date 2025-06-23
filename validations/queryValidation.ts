import Joi from 'joi';
import { validSortFields, validOrderValues } from '../lib/constants';

export const querySchema = Joi.object({
  sortBy: Joi.string().valid(...validSortFields).optional(),
  order: Joi.string().valid(...validOrderValues).optional(),
  search: Joi.string().pattern(/^[a-zA-Z]+$/).optional()
});