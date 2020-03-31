const { methodStyle, statusStyle } = require('./utils/loggerStyle');

const logger = (req, res, next) => {
  console.log(
    `${methodStyle(req.method)} -> ${req.protocol}://${req.get('host')}${
      req.originalUrl
    } [Status: ${statusStyle(res.statusCode)}]`
  );
  next();
};

module.exports = logger;
