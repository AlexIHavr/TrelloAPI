import ApiError from '../errors/ApiError.js';

const cardValidationMiddleware = (validationSchema) => {
  return function (req, res, next) {
    const { error } = validationSchema.validate(req.body);

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
};

export default cardValidationMiddleware;
