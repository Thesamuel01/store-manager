const productsModel = require('../models/productsModel');

const getAll = async () => {
  const products = await productsModel.getAll();

  return products;
};

const getById = async (id) => {
  const product = await productsModel.getById(id);

  return product;
};

const create = async (name) => {
  const productCreated = await productsModel.create(name);

  return productCreated;
};

module.exports = {
  getAll,
  getById,
  create
};
