import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export default (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};
