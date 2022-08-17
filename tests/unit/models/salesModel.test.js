const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');
const connection = require('../../../models/connection');

const { ALL_SALES_MOCK, SALE_BY_ID_MOCK } = require('../../mocks/sales');
const salesModel = require('../../../models/salesModel');

const allSales = [...ALL_SALES_MOCK];
const sale = [...SALE_BY_ID_MOCK];

describe('TEST CASE SALE MODEL - When search for all sales on database', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves([allSales, []]);
  });

  after(() => {
    connection.execute.restore();
  });

  it('It should return an array', async () => {
    const result = await salesModel.getAll();

    expect(result).to.be.an('array');
  });

  it('The array returned can not be empty', async () => {
    const result = await salesModel.getAll();

    expect(result).to.be.not.empty;
  });

  it('It should return an array of objects', async () => {
    const result = await salesModel.getAll();
    const item = result[0];

    expect(item).to.be.an('object');
  });

  it('The objects from array must has "saleId", "date", "productId and "quantity" keys', async () => {
    const result = await salesModel.getAll();
    const item = result[0];

    expect(item).to.all.keys('saleId', 'date', 'productId', 'quantity');
  })
});

describe('TEST CASE SALE MODEL - When search for a specific sale on database', () => {
  const ID = 1;

  before(() => {
    const executeResult = [sale, []];

    sinon.stub(connection, 'execute').resolves(executeResult);
  });

  after(() => {
    connection.execute.restore();
  });

  it('It should return an array', async () => {
    const result = await salesModel.getById(ID);

    expect(result).to.be.an('array');
  });

  it('The array returned can not be empty', async () => {
    const result = await salesModel.getById(ID);

    expect(result).to.be.not.empty;
  });

  it('The objects from array must has "saleId", "date", "productId and "quantity" keys', async () => {
    const result = await salesModel.getById(ID);
    const item = result[0];

    expect(item).to.all.keys('saleId', 'date', 'productId', 'quantity');
  })

  it('The sale id must be equal to id pass by parameters', async () => {
    const result = await salesModel.getById(ID);
    
    result.forEach(({ id }) => expect(id).to.be.equal(ID));
  })
});
