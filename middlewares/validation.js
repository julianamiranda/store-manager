const Joi = require('joi');

const nameSchema = Joi.object({ name: Joi.string().required().min(5) });

const nameCheck = (req, res, next) => {
  const { name } = req.body;
  const isValid = nameSchema.validate({ name });
  // console.log(isValid.error); /* tirar quando terminar o projeto */
  if (isValid.error) {
    const { message, details } = isValid.error;
    if (details[0].type === 'string.min') {
      return res.status(422).json({ message });
    }
    return res.status(400).json({ message });
  }
  next();
};

module.exports = {
  nameCheck,
};