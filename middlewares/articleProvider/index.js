/**
 * @typedef ArticleProviderMiddleware
 * @param {e.Request} request
 * @param {e.Response} response
 * @param {Function} next
 * @returns {Promise<void>}
 */


/**
 * @typedef ArticleProvider
 * @returns {Promise<String>}
 */


/**
 * @param {ArticleProvider} [provider]
 * @returns {ArticleProviderMiddleware}
 */
module.exports = (provider) => async (request, response, next) => {
  try {
    const article = await provider();

    response.status(200);
    response.send(article);
  } catch (e) {
    next(e);
  }
};
