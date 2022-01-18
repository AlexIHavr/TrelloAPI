import logger from '../log/logger.js';

const errorMiddleware = (err, req, res, next) => {
  console.log(err);
  //logger.runLogger('error', err.message, 'errors.log');

  res.json({ code: err.code, message: err.message });
};

export default errorMiddleware;
