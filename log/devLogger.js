import winston from 'winston';

const logFormat = winston.format.printf(({ level, stack }) => {
  return `${level}: ${stack}`;
});

const devLogger = winston.createLogger({
  format: winston.format.combine(winston.format.colorize(), logFormat),
  transports: new winston.transports.Console(),
});

export default devLogger;
