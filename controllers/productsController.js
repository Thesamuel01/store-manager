const productService = require('../services/productsService');

const getAll = async (_req, res) => {
  const products = await productService.getAll();

  res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await productService.getById(id);

  return res.status(200).json(product);
};

const create = async (req, res) => {
  const { name } = req.body;

  const result = await productService.create(name);

  return res.status(201).json(result);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const productUpdated = await productService.update(id, name);

  return res.status(200).json(productUpdated);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  
  await productService.deleteProduct(id);

  return res.status(204).send();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteProduct,
};