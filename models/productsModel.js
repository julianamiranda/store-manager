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

const create = async (name) => {
  const sql = 'INSERT INTO StoreManager.products (name) VALUES (?);';
  const [{ insertId }] = await connection.execute(sql, [name]);
  return { id: insertId, name };
};

const update = async (name, id) => {
  const sql = 'UPDATE StoreManager.products SET name = ? WHERE id= ?;';
  const [{ affectedRows }] = await connection.execute(sql, [name, id]);
  return affectedRows;
};

const remove = async (id) => {
  const sql = 'DELETE FROM StoreManager.products WHERE id= ?;';
  const [{ affectedRows }] = await connection.execute(sql, [id]);
  return affectedRows;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
