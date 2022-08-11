const connection = require('./connection');

const getAll = async () => {
  const sql = 'SELECT * FROM StoreManager.products;';
  const [result] = await connection.execute(sql);
  if (!result.length) return null;
  return result;
};

const getById = async (id) => {
  const sql = 'SELECT * FROM StoreManager.products WHERE id = ?;';
  const [result] = await connection.execute(sql, [id]);
  if (!result.length) return null;
  return result[0];
};

module.exports = {
  getAll,
  getById,
};
