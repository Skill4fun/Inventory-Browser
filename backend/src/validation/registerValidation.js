import Joi from 'joi';

export const registerValidation = ({ name, email, password }) => {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .messages({ 'string.empty': 'Name is required.' }),
    email: Joi.string()
      .required()
      .email()
      .messages({ 'string.empty': 'Email is required.' }),
    password: Joi.string()
      .min(8)
      .required()
      .messages({
        'string.empty': 'Password is required.',
        'string.min': 'Password must be at least 8 characters.',
      }),
  });

  return schema.validate({ name, email, password });
};
