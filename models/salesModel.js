const connection = require('./connection');
const format = require('./format');

const getAll = async () => {
  const sql = `SELECT SP.sale_id, S.date, SP.product_id, SP.quantity 
  FROM StoreManager.sales AS S 
  INNER JOIN StoreManager.sales_products AS SP ON S.id = SP.sale_id;`;
  const [result] = await connection.execute(sql);
  if (!result.length) return null;
  return result.map(format);
};

const getById = async (id) => {
  const sql = `SELECT S.date, SP.product_id, SP.quantity 
  FROM StoreManager.sales_products AS SP 
  INNER JOIN StoreManager.sales AS S ON SP.sale_id = S.id
  WHERE S.id = ?;`;
  const [result] = await connection.execute(sql, [id]);
  if (!result.length) return null;
  return result.map(format);
};

const createSalesId = async () => {
  const sql = 'INSERT INTO StoreManager.sales VALUES ();';
  const [result] = await connection.execute(sql);
  return result.insertId;
};

const create = async (id, productId, quantity) => {
  const sql = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) 
  VALUES(?, ?, ?);`;
  const [result] = await connection.execute(sql, [id, productId, quantity]);
  return result.affectedRows;
};

module.exports = {
  getAll,
  getById,
  createSalesId,
  create,
};
