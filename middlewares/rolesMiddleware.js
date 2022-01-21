import ApiError from '../errors/ApiError.js';

const rolesMiddleware = (roles) => {
  return function (req, res, next) {
    if (!req.roles.some((role) => roles.includes(role))) {
      return next(ApiError.Forbidden('No access, not enough rights.'));
    }

    next();
  };
};

export default rolesMiddleware;
