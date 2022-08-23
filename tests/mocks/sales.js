const ALL_SALES_MOCK = [
  {
    saleId: 1,
    date: '2022-05-27T01:59:51.000Z',
    productId: 1,
    quantity: 5
  },
  {
    saleId: 1,
    date: '2022-05-27T01:59:51.000Z',
    productId: 2,
    quantity: 10
  },
  {
    saleId: 2,
    date: '2022-05-27T01:59:51.000Z',
    productId: 3,
    quantity: 15
  },
];

const SALE_BY_ID_MOCK = [
  {
    saleId: 1,
    date: '2022-05-27T01:59:51.000Z',
    productId: 1,
    quantity: 5
  },
  {
    saleId: 1,
    date: '2022-05-27T01:59:51.000Z',
    productId: 2,
    quantity: 10
  },
];

const PRODUCTS_SOLDS = [
  {
    productId: 1,
    quantity: 1
  },
  {
    productId: 2,
    quantity: 5
  }
];

const SALE_CREATED = {
  id: 3,
  itemsSold: [...PRODUCTS_SOLDS],
};

const INVALID_SALE_DATA = [
  {
    productId: 1,
    quantity: 1
  },
  {
    productId: 22,
    quantity: 5
  }
];

const SALE_UPDATE = [
  {
    productId: 1,
    quantity: 10
  },
  {
    productId: 2,
    quantity: 50
  }
];

module.exports = {
  ALL_SALES_MOCK,
  SALE_BY_ID_MOCK,
  PRODUCTS_SOLDS,
  SALE_CREATED,
  INVALID_SALE_DATA,
  SALE_UPDATE,
};
