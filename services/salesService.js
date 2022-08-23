const boom = require('@hapi/boom');

const salesModel = require('../models/salesModel');
const productsService = require('../services/productsService');

const checkProductsIdExist = async (array) => {
  const products = await productsService.getAll();

  const hasAnInvalidId = array.some(({ productId }) => {
    const hasProduct = products.find(({ id }) => id === productId);

    return !hasProduct;
  });

  return hasAnInvalidId;
};

const checkSaleIdExist = async (id) => {
  const hasSale = await salesModel.getById(id);

  return hasSale.length === 0; 
};

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

const deleteSale = async (id) => {
  const isDeleted = await salesModel.deleteSale(id);

  return isDeleted;
};

const update = async (id, itemsUpdate) => {
  const hasAnInvalidProductId = await checkProductsIdExist(itemsUpdate);
  const hasAnInvalidSaleId = await checkSaleIdExist(id);

  if (hasAnInvalidProductId) throw boom.notFound('Product not found');
  if (hasAnInvalidSaleId) throw boom.notFound('Sale not found');

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
