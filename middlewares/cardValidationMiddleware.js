import Joi from 'joi';
import ApiError from '../errors/ApiError.js';

const cardValidationMiddleware = (req, res, next) => {
  const cardSchema = Joi.object({
    boardId: Joi.string()
      .trim()
      .guid({ version: ['uuidv4'] }),
    id: Joi.string()
      .trim()
      .guid({ version: ['uuidv4'] }),
    name: Joi.string().trim(),
    description: Joi.string().trim(),
    estimate: Joi.date(),
    status: Joi.string().trim(),
    dueDate: Joi.date(),
    labels: Joi.array().items(Joi.string()),
  });

  const { error } = cardSchema.validate(req.body);

  if (error) {
    return next(ApiError.BadRequest(error.message));
  }

  if (req.body.status) {
    const statuses = ['need to do', 'in progress', 'done', 'stoped', 'undone'];
    const checkStatus = statuses.includes(req.body.status);

    if (!checkStatus) {
      return next(ApiError.BadRequest(`Status is not correct. Available colors: ${statuses}`));
    }
  }

  next();
};

export default cardValidationMiddleware;
