import Joi from 'joi';
import { errorMessages } from '../models/errorMessages';

export const loginValidation = ({ email, password }) => {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .required()
      .email()
      .messages({ 'string.empty': errorMessages.emptyEmail }),
    password: Joi.string().min(8).required().messages({
      'string.empty': errorMessages.emptyPassword,
    }),
  });

  return schema.validate({ email, password });
};
