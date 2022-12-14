const express = require('express');
const rescue = require('express-rescue');

const productsController = require('../controllers/productsController');
const middlewares = require('../middlewares');

const productsRoute = express.Router();

productsRoute.get('/', rescue(productsController.getAll));

productsRoute.get('/search', rescue(productsController.getByName));

productsRoute.get('/:id', rescue(productsController.getById));

productsRoute.post('/', [
  rescue(middlewares.productValidation),
  rescue(productsController.create),
]);

productsRoute.put('/:id', [
  rescue(middlewares.productValidation),
  rescue(productsController.update),
]);

productsRoute.delete('/:id', rescue(productsController.deleteProduct));

module.exports = productsRoute;
