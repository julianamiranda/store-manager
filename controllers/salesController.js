const sales = require('../services/salesService');

const notFound = 'Sale not found';

const getAll = async (_req, res) => {
  try {
    const result = await sales.getAll();
    if (!result) return res.status(404).json({ message: notFound });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = await sales.getById(id);
    if (!result) return res.status(404).json({ message: notFound });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const create = async (req, res) => {
  try {
    const data = req.body;
    const checkProduct = await sales.exists(data);
    if (!checkProduct) return res.status(404).json({ message: 'Product not found' });
    const result = await sales.create(data);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const update = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    const checkProduct = await sales.exists(data);
    if (!checkProduct) return res.status(404).json({ message: 'Product not found' });
    const result = await sales.update(id, data);
    if (!result) return res.status(404).json({ message: notFound });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const remove = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const checkSale = await sales.getById(id);
    if (!checkSale) return res.status(404).json({ message: notFound });
    await sales.remove(id);
    return res.status(204).send();
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
};
