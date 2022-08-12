const products = require('../models/productsModel');

const getAll = async () => products.getAll();
const getById = async (id) => products.getById(id);
const create = async (name) => products.create(name);

module.exports = {
  getAll,
  getById,
  create,
};
