import winston from 'winston';

class Logger {
  constructor() {
    this._productLogger = this._createProductLogger();
    this._devLogger = this._createDevLogger();
  }

  runLogger(level, message, filePath) {
    if (process.env.NODE_ENV === 'production ') {
      this._productLogger
        .add(new winston.transports.File({ filename: filePath }))
        .log({ level, message });
    } else {
      this._devLogger.log({ level, message });
    }
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
