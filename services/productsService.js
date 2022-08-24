const boom = require('@hapi/boom');

const productsModel = require('../models/productsModel');

const getAll = async () => {
  const products = await productsModel.getAll();

  return products;
};

const getById = async (id) => {
  const product = await productsModel.getById(id);

  if (!product) throw boom.notFound('Product not found');

  return product;
};

const create = async (name) => {
  const productCreated = await productsModel.create(name);

  return productCreated;
};

const update = async (id, name) => {
  const productUpdated = await productsModel.update(id, name);

  if (!productUpdated) throw boom.notFound('Product not found');

  return productUpdated;
};

const deleteProduct = async (id) => {
  const isDeleted = await productsModel.deleteProduct(id);

  if (!isDeleted) throw boom.notFound('Product not found');

  return isDeleted;
};

const getByName = async (name) => {
  const products = await productsModel.getByName(name);

  return products;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteProduct,
  getByName,
};
