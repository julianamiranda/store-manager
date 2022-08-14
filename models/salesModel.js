const connection = require('./connection');

const createSalesId = async () => {
  const sql = 'INSERT INTO StoreManager.sales VALUES ();';
  const [result] = await connection.execute(sql);
  return result.insertId;
};

const create = async (id, data) => {
  const sql = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) 
  VALUES(?, ?, ?);`;
  await data.forEach(async ({ productId, quantity }) => {
    await connection.execute(sql, [id, productId, quantity]);
  });
  return { id, itemsSold: data };
};

module.exports = {
  createSalesId,
  create,
};
