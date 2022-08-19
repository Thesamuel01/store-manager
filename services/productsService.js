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

const update = async (id, name) => {
  const productUpdated = await productsModel.update(id, name);

  return productUpdated;
};

const deleteProduct = async (id) => {
  const isDeleted = await productsModel.deleteProduct(id);

  return isDeleted;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteProduct,
};
