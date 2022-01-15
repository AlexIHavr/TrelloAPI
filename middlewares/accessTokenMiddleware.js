import jwt from 'jsonwebtoken';
import ApiError from '../errors/ApiError.js';

const accessTokenMiddleware = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return next(ApiError.Forbidden());
  }

  const bearerToken = req.headers.authorization.split(' ');
  let accessToken = '';

  if (bearerToken[0] === 'Bearer') {
    accessToken = bearerToken[1];
  } else {
    return next(ApiError.Forbidden());
  }

  try {
    jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
    next();
  } catch (e) {
    next(ApiError.Forbidden());
  }
};

export default accessTokenMiddleware;
