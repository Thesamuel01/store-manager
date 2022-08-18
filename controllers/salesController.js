const boom = require('@hapi/boom');
const salesService = require('../services/salesService');

const getAll = async (_req, res) => {
  const products = await salesService.getAll();

  res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const products = await salesService.getById(id);

  if (products.length === 0) throw boom.notFound('Sale not found');

  return res.status(200).json(products);
};

const create = async (req, res) => {
  const result = await salesService.create(req.body);

  return res.status(201).json(result);
};

module.exports = {
  getAll,
  getById,
  create,
};