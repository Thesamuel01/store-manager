const { expect } = require('chai');
const { describe, beforeEach } = require('mocha');
const sinon = require('sinon');
const connection = require('../../../models/connection');

const mock = require('../../mocks/sales');
const salesModel = require('../../../models/salesModel');

const allSales = [...mock.ALL_SALES_MOCK];
const sale = [...mock.SALE_BY_ID_MOCK];
const productsSold = [...mock.PRODUCTS_SOLDS];

describe('TEST CASE SALE MODEL - When search for all sales on database', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves([allSales, []]);
  });

  after(() => {
    connection.execute.restore();
  });

  it('It must return an array', async () => {
    const result = await salesModel.getAll();

    expect(result).to.be.an('array');
  });

  it('The array returned can not be empty', async () => {
    const result = await salesModel.getAll();

    expect(result).to.be.not.empty;
  });

  it('It must return an array of objects', async () => {
    const result = await salesModel.getAll();
    const item = result[0];

    expect(item).to.be.an('object');
  });

  it('The objects from array must has "saleId", "date", "productId and "quantity" keys', async () => {
    const result = await salesModel.getAll();
    const item = result[0];

    expect(item).to.all.keys('saleId', 'date', 'productId', 'quantity');
  });
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

  it('It must return an array', async () => {
    const result = await salesModel.getById(ID);

    expect(result).to.be.an('array');
  });

  it('The array returned can not be empty', async () => {
    const result = await salesModel.getById(ID);

    expect(result).to.be.not.empty;
  });

  it('The objects from array must has "saleId", "date", "productId" and "quantity" keys', async () => {
    const result = await salesModel.getById(ID);
    const item = result[0];

    expect(item).to.all.keys('saleId', 'date', 'productId', 'quantity');
  });

  it('The sale id must be equal to id pass by parameters', async () => {
    const result = await salesModel.getById(ID);
    
    result.forEach(({ saleId }) => expect(saleId).to.be.equal(ID));
  });
});

describe('TEST CASE SALE MODEL - When a product is insert into database', () => {
  beforeEach(() => {
    const firstCall = [{ insertId: 3 }, undefined];
    const nthCalls = [{}, undefined];

    const funcStub = sinon.stub(connection, 'execute');

    funcStub.onFirstCall().resolves(firstCall);
    funcStub.resolves(nthCalls);
  });

  afterEach(() => {
    connection.execute.restore();
  });

  it('It must return an object', async () => {
    const result = await salesModel.create(productsSold);

    expect(result).to.be.an('object');
  });

  it('The object returned must have "id" and "itemsSold keys', async () => {
    const result = await salesModel.create(productsSold);

    expect(result).to.all.keys('id', 'itemsSold');
  });

  it('The itemsSold key must have an array with the products sold', async () => {
    const { itemsSold } = await salesModel.create(productsSold);

    expect(itemsSold).to.eql(productsSold);
  });
});

describe('TEST CASE SALE MODEL - When a product is deleted', () => {
  describe('When product is not found', () => {
    before(() => {
      const executeResult = [{ affectedRows: 0 }, undefined];
  
      sinon.stub(connection, 'execute').resolves(executeResult);
    });
  
    after(() => {
      connection.execute.restore();
    }); 

    it('It must return false', async () => {
      const result = await salesModel.deleteProduct(9);
  
      expect(result).to.be.false;
    });
  })

  describe('When product is deleted', () => {
    before(() => {
      const executeResult = [{ affectedRows: 1 }, undefined];
  
      sinon.stub(connection, 'execute').resolves(executeResult);
    });
  
    after(() => {
      connection.execute.restore();
    });
  
    it('It must return true', async () => {
      const result = await salesModel.deleteProduct(1);
  
      expect(result).to.be.true;
    });
  })
});
