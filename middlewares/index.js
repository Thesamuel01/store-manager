const errorMiddleware = require('./errorMiddleware');
const productMiddleware = require('./productsValidation');

module.exports = {
  errorMiddleware,
  productMiddleware,
};
