const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    `
    SELECT
      SP.sale_id AS saleId,
      SP.product_id AS productId,
      SP.quantity,
      S.date
    FROM StoreManager.sales AS S
    INNER JOIN StoreManager.sales_products AS SP
    ON S.id = SP.sale_id
    ORDER BY saleId ASC, productId ASC;
    `,
  );

  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute(
    `
    SELECT
      SP.product_id AS productId,
      SP.quantity,
      S.date
    FROM StoreManager.sales AS S
    INNER JOIN StoreManager.sales_products AS SP
    ON S.id = SP.sale_id
    WHERE SP.sale_id = ?
    ORDER BY sale_id ASC, product_id ASC; 
    `,
    [id],
  );

  return result;
};

const create = async (itemsSold) => {
  const [saleRows] = await connection.execute('INSERT INTO StoreManager.sales VALUES ();');

  itemsSold.forEach(async ({ productId, quantity }) => {
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [saleRows.insertId, productId, quantity],
    );
  });

  return {
    id: saleRows.insertId,
    itemsSold,
  };
};

const deleteSale = async (id) => {
  const [rows] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?;',
    [id],
  );

  return rows.affectedRows === 1;
};

const update = async (saleId, itemsUpdated) => {
  const result = await getById(saleId);

  if (result.length === 0) return null;

  itemsUpdated.forEach(async ({ productId, quantity }) => {
    await connection.execute(
      'UPDATE StoreManager.sales_products SET quantity=? WHERE sale_id = ? AND product_id = ?;',
      [quantity, saleId, productId],
    );
  });

  return {
    saleId,
    itemsUpdated,
  };
};

module.exports = {
  getAll,
  getById,
  create,
  deleteSale,
  update,
};
