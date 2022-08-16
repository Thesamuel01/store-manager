const express = require('express');
const rescue = require('express-rescue');

const productsController = require('../controllers/productsController');

const productsRoute = express.Router();

productsRoute.get('/', rescue(productsController.getAll));

productsRoute.get('/:id', rescue(productsController.getById));

module.exports = productsRoute;
