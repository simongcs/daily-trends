import Joi from 'joi';

export const feedSchemaValidator = Joi.object({
  title: Joi.string().required(),
  link: Joi.string().required(),
  source: Joi.string().required(),
  date: Joi.date(),
});

export const feedArraySchema = Joi.array().items(feedSchemaValidator);
