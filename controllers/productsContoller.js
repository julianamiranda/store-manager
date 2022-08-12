const products = require('../services/productsService');

const getAll = async (_req, res) => {
  const result = await products.getAll();
  if (!result) return res.status(404).json({ message: 'Product not found' });
  return res.status(200).json(result);
};
const getById = async (req, res) => {
  const id = Number(req.params.id);
  const result = await products.getById(id);
  if (!result) return res.status(404).json({ message: 'Product not found' });
  return res.status(200).json(result);
};

const create = async (req, res) => {
  const { name } = req.body;
  const result = await products.create(name);
  return res.status(201).json(result);
};

const update = async (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;
  const result = await products.update(name, id);
  console.log(result);
  if (!result) return res.status(404).json({ message: 'Product not found' });
  return res.status(200).json(result);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};
