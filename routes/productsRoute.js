const express = require('express');
const rescue = require('express-rescue');

const productsController = require('../controllers/productsController');
const productsValidate = require('../middlewares');

const productsRoute = express.Router();

productsRoute.get('/', rescue(productsController.getAll));

productsRoute.get('/:id', rescue(productsController.getById));

productsRoute.post('/', [
  rescue(productsValidate.productMiddleware),
  rescue(productsController.create),
]);

module.exports = productsRoute;
