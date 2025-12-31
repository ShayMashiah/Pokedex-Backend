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

export function validateParams(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const dataToValidate = {
      ...req.params,
      ...req.query,
    };
    const { error } = schema.validate(dataToValidate, { abortEarly: false });
    if (error) {
       res.status(400).json({ message: error.details[0].message });
       return;
    }

    next();
  };
}


export function validateId(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.params);
    if (error) {
       res.status(400).json({
            message: 'Invalid ID',
            details: error.details.map(d => d.message),
      });
       return;
    }
    next();
  };
}