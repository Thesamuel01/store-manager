const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute('SELECT * FROM StoreManager.products ORDER BY id ASC ');

  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );

  return result[0];
};

const create = async (name) => {
  const [rows] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );

  return {
    id: rows.insertId,
    name,
  };
};

const update = async (id, name) => {
  const [rows] = await connection.execute(
    'UPDATE StoreManager.products SET name=? WHERE id = ?;',
    [name, id],
  );

  return rows.affectedRows === 1 ? { id, name } : null;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};
