import logger from '../log/logger.js';

const errorMiddleware = (err, req, res, next) => {
  logger.runLogger('error', err.message);

  res.json({ code: err.code, message: err.message });
};

export default errorMiddleware;
