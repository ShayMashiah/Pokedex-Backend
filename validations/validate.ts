import { Request, Response, NextFunction } from 'express';
import Joi, { ObjectSchema } from 'joi';

export function validate(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        res.status(400).json({
            message: 'Validation failed',
            details: error.details.map(d => d.message),
      });
      return;
    }
    req.body = value;
    next();
  };
}
