const sales = require('../models/salesModel');
const products = require('../models/productsModel');

const getAll = async () => sales.getAll();
const getById = async (id) => sales.getById(id);
const exists = async (data) => {
  const all = (await products.getAll()).map((product) => product.id);
  const ids = data.map((sale) => sale.productId);
  const notExists = ids.some((id) => !(all.find((i) => i === id)));
  if (notExists) return null;
  return true;
};

const create = async (data) => {
  const id = await sales.createSalesId();
  await data.forEach(async ({ productId, quantity }) => {
    await sales.create(id, productId, quantity);
  });
  return { id, itemsSold: data };
};
module.exports = {
  getAll,
  getById,
  create,
  exists,
};
