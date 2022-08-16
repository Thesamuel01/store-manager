const Boom = require('@hapi/boom');
const productService = require('../services/productsService');

const getAll = async (_req, res) => {
  const products = await productService.getAll();

  res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const products = await productService.getById(id);

  if (!products) throw Boom.notFound('Product not found');

  return res.status(200).json(products);
};

module.exports = {
  getAll,
  getById,
};