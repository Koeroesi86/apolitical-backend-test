/**
 * @typedef LoggerMiddleware
 * @param {e.Request} request
 * @param {e.Response} response
 * @param {Function} next
 * @returns {Promise<void>}
 */

/**
 * @typedef Logger
 * @property {Function} log
 */

/**
 * @param {Logger} logger
 * @returns {LoggerMiddleware}
 */
const loggerMiddleware = (logger) => async (request, response, next) => {
  const before = Date.now();

  const listener = () => {
    logger.log({
      level: response.statusCode < 400 ? 'info' : 'error',
      message: 'Response sent',
      duration: Date.now() - before,
      method: request.method,
      status: response.statusCode,
      count: response.getHeader('x-current-count') || 0
    })

    response.removeListener('finish', listener);
  };

  response.on('finish', listener);

  next();
};

module.exports = loggerMiddleware;
