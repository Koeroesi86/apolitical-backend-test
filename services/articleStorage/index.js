const axios = require("axios");

/**
 * @typedef ArticleStorage
 * @returns {Promise<String>}
 */

/** @var {ArticleStorage} article */
const articleStorage = async () => {
  const res = await axios('http://asdfast.beobit.net/api/');

  return res.data.text;
};

module.exports = articleStorage;
