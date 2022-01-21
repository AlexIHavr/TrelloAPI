import ApiError from '../errors/ApiError.js';

const validationMiddleware = (validationSchema) => {
  return function (req, res, next) {
    const { error } = validationSchema.validate(req.body);

    if (error) {
      return next(ApiError.BadRequest(error.message));
    }

    next();
  };
};

export default validationMiddleware;
