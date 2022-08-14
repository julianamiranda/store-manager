const Joi = require('joi');

const nameSchema = Joi.object({ name: Joi.string().required().min(5) });

const salesSchema = Joi.array().items(
  Joi.object({
    productId: Joi.number().required().messages({
      'any.required': '"productId" is required',
    }),
    quantity: Joi.number().required().min(1).messages({
      'any.required': '"quantity" is required',
      'number.min': '"quantity" must be greater than or equal to 1',
    }),
  }),
);

const nameCheck = (req, res, next) => {
  const { name } = req.body;
  const isValid = nameSchema.validate({ name });
  if (isValid.error) {
    const { message, details } = isValid.error;
    if (details[0].type === 'string.min') {
      return res.status(422).json({ message });
    }
    return res.status(400).json({ message });
  }
  next();
};

const salesCheck = (req, res, next) => {
  const data = req.body;
  const isValid = salesSchema.validate(data);
  if (isValid.error) {
    const { message, details } = isValid.error;
    if (details[0].type === 'any.required') {
      return res.status(400).json({ message });
    }
    if (details[0].type === 'number.min') {
      return res.status(422).json({ message });
    }
  }
  next();
};
module.exports = {
  nameCheck,
  salesCheck,
};

// validação de um array: https://stackoverflow.com/a/42656623