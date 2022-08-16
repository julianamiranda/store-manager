const { Router } = require('express');
const validation = require('../middlewares/validation');
const salesController = require('../controllers/salesController');

const sales = Router();

sales.get('/', salesController.getAll);
sales.get('/:id', salesController.getById);
sales.post('/', validation.salesCheck, salesController.create);
sales.put('/:id', validation.salesCheck, salesController.update);
sales.delete('/:id', salesController.remove);

module.exports = sales;