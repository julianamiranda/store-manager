const sales = require('../services/salesService');

const create = async (req, res) => {
  try {
    const data = req.body;
    const checkProduct = await sales.exists(data);
    if (!checkProduct) return res.status(404).json({ message: 'Product not found' });
    const result = await sales.create(data);
    return res.status(201).json(result);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

module.exports = {
  create,
};
