import ApiError from '../errors/ApiError.js';

const boardValidationMiddleware = (validationSchema) => {
  return function (req, res, next) {
    const { error } = validationSchema.validate(req.body);

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
};

export default boardValidationMiddleware;
