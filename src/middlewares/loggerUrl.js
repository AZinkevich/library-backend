const loggerMiddleware = (req, res, next) => {
  console.log(`Запрос на адрес: ${req.originalUrl}`);
  next();
};

module.exports = loggerMiddleware;
