const NodeCache = require("node-cache");

const cache = new NodeCache({ stdTTL: 60 });

const verifyCache = (req, res, next) => {
  try {
    const key = req.originalUrl + req.url + req.method;
    if (cache.has(key)) {
      return res.status(200).json(cache.get(key));
    }
    return next();
  } catch (err) {
    throw new Error(err);
  }
};

const setCache = (req, data) => {
  try {
    const key = req.originalUrl + req.url + req.method;
    cache.set(key, data);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  verifyCache,
  setCache,
};
