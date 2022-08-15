const connection = require('./connection');

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
  createSalesId,
  create,
};
