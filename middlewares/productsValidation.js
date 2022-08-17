const boom = require('@hapi/boom');

const productSchema = require('../schemas/productSchema');

const productsMidleware = (req, _res, next) => {
  const { error } = productSchema.validate(req.body);

  if (error) {
    const [statusCode, message] = error.message.split('|');

    throw boom.boomify(new Error(message), { statusCode });
  }

  next();
};

module.exports = {
  productsMidleware,
};
