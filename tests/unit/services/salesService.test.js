const { expect } = require('chai');
const { describe, beforeEach } = require('mocha');
const sinon = require('sinon');

const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');
const mock = require('../../mocks/sales');

const allSales = [...mock.ALL_SALES_MOCK];
const sales = [...mock.SALE_BY_ID_MOCK];
const productsSold = [...mock.PRODUCTS_SOLDS];
const saleCreated = { ...mock.SALE_CREATED };

describe('TEST CASE SALE SERVICE - When search for all sales on database', () => {
  before(() => {
    sinon.stub(salesModel, 'getAll').resolves(allSales);
  });

  after(() => {
    salesModel.getAll.restore();
  });

  it('It must return an array', async () => {
    const result = await salesService.getAll();

    expect(result).to.be.an('array');
  });

  it('The array returned can not be empty', async () => {
    const result = await salesService.getAll();

    expect(result).to.be.not.empty;
  });

  it('It must return an array of objects', async () => {
    const result = await salesService.getAll();
    const item = result[0];

    expect(item).to.be.an('object');
  });

  it('The objects from array must has "saleId", "date", "productId and "quantity" keys', async () => {
    const result = await salesService.getAll();
    const item = result[0];

    expect(item).to.all.keys('saleId', 'date', 'productId', 'quantity');
  });
});

describe('TEST CASE SALE SERVICE - When search for a specific sale on database', () => {
  const ID = 1;

  before(() => {
    sinon.stub(salesModel, 'getById').resolves(sales);
  });

  after(() => {
    salesModel.getById.restore();
  });

  it('It must return an array', async () => {
    const result = await salesService.getById(ID);

    expect(result).to.be.an('array');
  });

  it('The array returned can not be empty', async () => {
    const result = await salesService.getById(ID);

    expect(result).to.be.not.empty;
  });

  it('The objects from array must has "saleId", "date", "productId" and "quantity" keys', async () => {
    const result = await salesService.getById(ID);
    const item = result[0];

    expect(item).to.all.keys('saleId', 'date', 'productId', 'quantity');
  });

  it('The sale id must be equal to id pass by parameters', async () => {
    const result = await salesService.getById(ID);
    
    result.forEach(({ saleId }) => expect(saleId).to.be.equal(ID));
  });
});

describe('TEST CASE SALE SERVICE - When a sale is insert into database', () => {
  beforeEach(() => {
    sinon.stub(salesModel, 'create').resolves(saleCreated);
  });

  afterEach(() => {
    salesModel.create.restore();
  });

  it('It must return an object', async () => {
    const result = await salesService.create(productsSold);

    expect(result).to.be.an('object');
  });

  it('The object returned must have "id" and "itemsSold keys', async () => {
    const result = await salesService.create(productsSold);

    expect(result).to.all.keys('id', 'itemsSold');
  });

  it('The itemsSold key must have an array with the products sold', async () => {
    const { itemsSold } = await salesService.create(productsSold);

    expect(itemsSold).to.eql(productsSold);
  });
});