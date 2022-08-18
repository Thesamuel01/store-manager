const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    `
    SELECT
      SP.sale_id AS salesId,
      SP.product_id AS productId,
      SP.quantity,
      S.date
    FROM StoreManager.sales AS S
    INNER JOIN StoreManager.sales_products AS SP
    ON S.id = SP.sale_id
    ORDER BY salesId ASC, productId DESC;
    `,
  );

  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute(
    `
    SELECT
      SP.sale_id AS salesId,
      SP.product_id AS productId,
      SP.quantity,
      S.date
    FROM StoreManager.sales AS S
    INNER JOIN StoreManager.sales_products AS SP
    ON S.id = SP.sale_id
    WHERE SP.sale_id = ?
    ORDER BY salesId ASC, productId DESC; 
    `,
    [id],
  );

  return result;
};

const create = async (itemsSold) => {
  const [saleRows] = await connection.execute('INSERT INTO StoreManager.sales VALUES ();');

  itemsSold.forEach(async ({ productId, quantity }) => {
    await connection.execute(
      'INSERT INTO StoreManager.sales (sales_id, product_id, quantity) VALUES (?, ?, ?)',
      [saleRows.insertId, productId, quantity],
    );
  });

  return {
    id: saleRows.insertId,
    itemsSold,
  };
};

module.exports = {
  getAll,
  getById,
  create,
};
