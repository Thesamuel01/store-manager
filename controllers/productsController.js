const boom = require('@hapi/boom');
const productService = require('../services/productsService');

const getAll = async (_req, res) => {
  const products = await productService.getAll();

  res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const products = await productService.getById(id);

  if (!products) throw boom.notFound('Product not found');

  return res.status(200).json(products);
};

const create = async (req, res) => {
  const { name } = req.body;

  const result = await productService.create(name);

  return res.status(201).json(result);
};

module.exports = {
  getAll,
  getById,
  create,
};