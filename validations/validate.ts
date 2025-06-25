import { Request, Response, NextFunction } from 'express';
import Joi, { ObjectSchema } from 'joi';

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
  }
}

export function validateQuery(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.query);

    if (error) {
       res.status(400).json({ message: error.details[0].message });
       return;
    }

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

export function validateUserIdParam(req: Request, res: Response, next: NextFunction) {
  const { userId } = req.params;

  const id = Number(userId);

  if (!userId || isNaN(id) || id <= 0 || !Number.isInteger(id)) {
     res.status(400).json({ error: "Invalid userId parameter" });
     return;
  }

  next();
}

export function validateSearchParam(req: Request, res: Response, next: NextFunction) {
  const { search } = req.query;
  if (!search) {
    return next();
  }

  if (typeof search === "string") {
    const isValid = /^[a-zA-Z\s\-']+$/.test(search);
    if (!isValid) {
        res.status(400).json({
        error: "Search query contains invalid characters. Only letters are allowed.",
      });
      return;
    }
  }

  next();
}
