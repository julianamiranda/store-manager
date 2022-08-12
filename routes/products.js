const { Router } = require('express');
const validation = require('../middlewares/validation');
const productsController = require('../controllers/productsContoller');

const products = Router();

products.get('/', productsController.getAll);
products.post('/', validation.nameCheck, productsController.create);
products.get('/:id', productsController.getById);

module.exports = products;