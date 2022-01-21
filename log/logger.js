import winston from 'winston';

class Logger {
  constructor() {
    if (process.env.NODE_ENV === 'production ') {
      this._logger = this._createProductLogger();
    } else {
      this._logger = this._createDevLogger();
    }
  }

  runLogger(level, message) {
    this._logger.log({ level, message });
  }

  _createProductLogger() {
    const logFormat = winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} - ${level}: ${message}`;
    });

    return winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
        logFormat
      ),
      transports: new winston.transports.File({ filename: 'logs.log' }),
    });
  }

  _createDevLogger() {
    const logFormat = winston.format.printf(({ level, message }) => {
      return `${level}: ${message}`;
    });

    return winston.createLogger({
      format: winston.format.combine(winston.format.colorize(), logFormat),
      transports: new winston.transports.Console(),
    });
  }
}

export default new Logger();
