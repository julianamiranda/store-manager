const products = require('../models/productsModel');

const getAll = async () => products.getAll();
const getById = async (id) => products.getById(id);
const create = async (name) => products.create(name);
const update = async (name, id) => {
  const productCheck = await products.getById(id);
  if (!productCheck) return null;
  await products.update(name, id);
  return { id, name };
};
const remove = async (id) => {
  const productCheck = await products.getById(id);
  if (!productCheck) return null;
  await products.remove(id);
  return true;
};
const search = async (item) => products.search(item);

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  search,
};
