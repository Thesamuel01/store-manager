const productsModel = require('../models/productsModel');

const getAll = async () => await productsModel.getAll();

const getById = async () => await productsModel.getById();

module.exports = {
  getAll,
  getById,
};
