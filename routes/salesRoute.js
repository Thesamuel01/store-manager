const express = require('express');
const rescue = require('express-rescue');

const salesController = require('../controllers/salesController');

const salesRoute = express.Router();

salesRoute.get('/', rescue(salesController.getAll));

salesRoute.get('/:id', rescue(salesController.getById));

salesRoute.post('/', [
  rescue(salesController.create),
]);

module.exports = salesRoute;
