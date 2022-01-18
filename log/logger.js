import winston from 'winston';

class Logger {
  runLogger(level, message) {
    if (process.env.NODE_ENV === 'production ') {
      this._getProductLogger().log({ level, message });
    } else {
      this._getDevLogger().log({ level, message });
    }
  }

  _getProductLogger() {
    const logFormat = winston.format.printf(({ timestamp, code, message }) => {
      return `${timestamp} - ${code} ${message}`;
    });

    return winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
        logFormat
      ),
      transports: new winston.transports.File({ filename: 'errors.log' }),
    });
  }

  _getDevLogger() {
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
