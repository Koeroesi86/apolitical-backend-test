
/**
 * @typedef RateStorage
 * @property {function(ip: String): Promise<number>} get
 * @property {function(ip: String, count: Number): Promise<void>} set
 */

/** @var {RateStorage} rateStorage */
const rateStorage = {
  _visitorCounter: {},
  get: async (ip) => {
    if (rateStorage._visitorCounter[ip] === undefined) {
      return 0;
    }

    return rateStorage._visitorCounter[ip];
  },
  set: async (ip, count) => {
    if (isNaN(count)) {
      throw new Error('Count is not a number')
    }

    rateStorage._visitorCounter[ip] = count;
  },
};

module.exports = rateStorage;