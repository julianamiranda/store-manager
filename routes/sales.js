const { Router } = require('express');
const validation = require('../middlewares/validation');
const salesController = require('../controllers/salesController');

const sales = Router();

sales.post('/', validation.salesCheck, salesController.create);

module.exports = sales;