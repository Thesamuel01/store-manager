const productsModel = require('../models/productsModel');

const getAll = async () => {
  const products = await productsModel.getAll();

  return products;
};

const getById = async () => {
  const product = await productsModel.getById();

  return product;
};

module.exports = {
  getAll,
  getById,
};
