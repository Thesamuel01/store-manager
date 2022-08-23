const boom = require('@hapi/boom');

const salesModel = require('../models/salesModel');
const productsService = require('./productsService');

const checkProductsIdExist = async (array) => {
  const products = await productsService.getAll();

  const hasAnInvalidId = array.some(({ productId }) => {
    const hasProduct = products.find(({ id }) => id === productId);

    return !hasProduct;
  });

  return hasAnInvalidId;
};

const getAll = async () => {
  const products = await salesModel.getAll();

  return products;
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);

  if (sale.length === 0) throw boom.notFound('Sale not found');

  return sale;
};

const create = async (itemsSold) => {
  const hasAnInvalidId = await checkProductsIdExist(itemsSold);

  if (hasAnInvalidId) throw boom.notFound('Product not found');

  const saleCreated = await salesModel.create(itemsSold);

  return saleCreated;
};

const deleteSale = async (id) => {  
  const isDeleted = await salesModel.deleteSale(id);
  
  if (!isDeleted) throw boom.notFound('Sale not found');

  return isDeleted;
};

const update = async (id, itemsUpdate) => {
  await getById(id);

  const hasAnInvalidProductId = await checkProductsIdExist(itemsUpdate);
  if (hasAnInvalidProductId) throw boom.notFound('Product not found');

  const saleUpdated = await salesModel.update(id, itemsUpdate);

  return saleUpdated;
};

module.exports = {
  getAll,
  getById,
  create,
  deleteSale,
  update,
};
