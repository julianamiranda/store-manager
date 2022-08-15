const products = require('../services/productsService');

const notFound = 'Product not found';

const getAll = async (_req, res) => {
  try {
    const result = await products.getAll();
    if (!result) return res.status(404).json({ message: notFound });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = await products.getById(id);
    if (!result) return res.status(404).json({ message: notFound });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const create = async (req, res) => {
  try {
    const { name } = req.body;
    const result = await products.create(name);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const update = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;
    const result = await products.update(name, id);
    if (!result) return res.status(404).json({ message: notFound });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const remove = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = await products.remove(id);
    if (!result) return res.status(404).json({ message: notFound });
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const search = async (req, res) => {
  try {
    const { q } = req.query;
    const result = await products.search(`%${q}%`);
    if (!result) return res.status(200).json(await products.getAll());
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  search,
};
