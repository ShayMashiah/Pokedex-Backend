import { Request, Response, NextFunction } from 'express';
import Joi, { ObjectSchema } from 'joi';
import { validSortFields, validOrderValues } from '../lib/constants';

export function validate(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        res.status(400).json({
            message: 'Wrong values inserted',
            details: error.details.map(d => d.message),
      });
      return;
    }
    req.body = value;
    next();
  };
}

export function validatePokemonId(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  if (!/^\d+$/.test(id)) {
      res.status(400).json({ message: 'Invalid Pokémon ID. It must be a positive integer.' });
      return;
  }
  next();
}
  
export function validatePokemonQueryParams(req: Request, res: Response, next: NextFunction) {
  const { sortBy, order, search } = req.query;

  if (sortBy && typeof sortBy === 'string' && !validSortFields.includes(sortBy)) {
      res.status(400).json({ message: `Invalid sort field: ${sortBy}` });
      return;
  }

  if (order && typeof order === 'string' && !validOrderValues.includes(order.toLowerCase())) {
     res.status(400).json({ message: `Invalid order value: ${order}` });
     return;
  }

  if (search) {
    if (typeof search !== 'string') {
      res.status(400).json({ message: 'Search must be a string' });
      return;
    }

    if (!/^[a-zA-Z]+$/.test(search)) {
      res.status(400).json({ message: 'Search must contain only letters' });
      return;
    }

  }
  next();
}
