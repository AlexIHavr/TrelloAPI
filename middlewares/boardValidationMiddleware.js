import Joi from 'joi';
import ApiError from '../errors/ApiError.js';

const boardValidationMiddleware = (req, res, next) => {
  const boardSchema = Joi.object({
    id: Joi.string()
      .trim()
      .guid({ version: ['uuidv4'] }),
    name: Joi.string().trim(),
    color: Joi.string().trim(),
    description: Joi.string().trim(),
  });

  const { error } = boardSchema.validate(req.body);

  if (error) {
    return next(ApiError.BadRequest(error.message));
  }

  if (req.body.color) {
    const colors = ['white', 'black', 'green', 'yelow', 'blue', 'grey', 'red'];
    const checkColor = colors.includes(req.body.color);

    if (!checkColor) {
      return next(ApiError.BadRequest(`Color is not correct. Available colors: ${colors}`));
    }
  }

  next();
};

export default boardValidationMiddleware;
