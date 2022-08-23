const boom = require('@hapi/boom');
const salesService = require('../services/salesService');
const productsService = require('../services/productsService');

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

const checkProductsIdExist = async (array) => {
  const products = await productsService.getAll();

  const hasAnInvalidId = array.some(({ productId }) => {
    const hasProduct = products.find(({ id }) => id === productId);

    return !hasProduct;
  });

  return hasAnInvalidId;
};

const create = async (req, res) => {
  const sales = req.body;
  const hasAnInvalidId = await checkProductsIdExist(sales);

  if (hasAnInvalidId) throw boom.notFound('Product not found');

  const result = await salesService.create(sales);

  return res.status(201).json(result);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const isDeleted = await salesService.deleteSale(id);

  if (!isDeleted) throw boom.notFound('Sale not found');

  return res.status(204).send();
};

const update = async (req, res) => {
  const { id } = req.params;
  const itemsUpdate = req.body;

  const saleUpdated = await salesService.update(id, itemsUpdate);

  return res.status(200).json(saleUpdated);
};

module.exports = {
  getAll,
  getById,
  create,
  deleteSale,
  update,
};