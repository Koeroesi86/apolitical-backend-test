/**
 * @typedef RateLimiterMiddleware
 * @param {e.Request} request
 * @param {e.Response} response
 * @param {Function} next
 * @returns {Promise<void>}
 */

/**
 *
 * @param {RateStorage} rateStorage
 * @returns {RateLimiterMiddleware}
 */
module.exports = (rateStorage) => async (request, response, next) => {
    const ip = request.ip;
    const count = await rateStorage.get(ip);
    const currentCount = count + 1;

    await rateStorage.set(ip, currentCount);

    response.setHeader('x-current-count', currentCount);

    if (count < 3) {
      next();
    } else {
      response.status(401);
      response.send("Sorry, you have reached the limit.");
    }
};
