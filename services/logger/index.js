const winston = require("winston");

module.exports = winston.createLogger({
  exitOnError: false,
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    })
  ],
});