const boom = require('@hapi/boom');

const saleSchema = require('../schemas/salesSchema');

const salesMidleware = (req, _res, next) => {
  const { error } = saleSchema.validate(req.body);

  if (error) {
    const [statusCode, message] = error.message.split('|');

    throw boom.boomify(new Error(message), { statusCode });
  }

  next();
};

module.exports = salesMidleware;
