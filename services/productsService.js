const products = require('../models/productsModel');

const getAll = async () => products.getAll();
const getById = async (id) => products.getById(id);
const create = async (name) => products.create(name);
const update = async (name, id) => {
  const productCheck = await products.getById(id);
  if (!productCheck) return null;
  const rows = await products.update(name, id);
  if (rows !== 1) return null;
  return { id, name };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};
