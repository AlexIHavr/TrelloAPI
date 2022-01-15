import winston from 'winston';

const logFormat = winston.format.printf(({ timestamp, code, stack }) => {
  return `${timestamp} - ${code} ${stack}`;
});

const productLogger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    logFormat
  ),
  transports: new winston.transports.File({ filename: 'errors.log' }),
});

export default productLogger;
