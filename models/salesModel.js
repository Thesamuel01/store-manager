const connection = require("./connection");

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
    ON S.id = SP.sale_id; 
    `
  );

  return result;
};

module.exports = {
  getAll,
};