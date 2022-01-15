import devLogger from '../log/devLogger.js';
import productLogger from '../log/productLogger.js';

const errorMiddleware = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'production ') {
    productLogger.error(err);
  } else {
    devLogger.error(err);
  }

  res.json({ code: err.code, message: err.message });
};

export default errorMiddleware;
