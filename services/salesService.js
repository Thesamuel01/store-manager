const salesModel = require('../models/salesModel');

const getAll = async () => {
  const products = await salesModel.getAll();

  return products;
};

const getById = async (id) => {
  const product = await salesModel.getById(id);

  return product;
};

const create = async (itemsSold) => {
  const productCreated = await salesModel.create(itemsSold);

  return productCreated;
};

module.exports = {
  getAll,
  getById,
  create,
};
