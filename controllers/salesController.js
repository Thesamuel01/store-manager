const salesService = require('../services/salesService');

const getAll = async (_req, res) => {
  const products = await salesService.getAll();

  res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const products = await salesService.getById(id);

  return res.status(200).json(products);
};

const create = async (req, res) => {
  const sales = req.body;

  const result = await salesService.create(sales);

  return res.status(201).json(result);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  
  await salesService.deleteSale(id);

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