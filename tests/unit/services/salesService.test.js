const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { describe, beforeEach } = require('mocha');
const sinon = require('sinon');
const { Boom } = require('@hapi/boom');

// Codigo retirado da documentacao para usar o chai com promises
const expect = chai.expect
chai.use(chaiAsPromised);

const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');
const productsService = require('../../../services/productsService');
const mock = require('../../mocks/sales');
const productsMock = require('../../mocks/products');
const allProducts = [...productsMock.ALL_PRODUCTS_MOCK];

const allSales = [...mock.ALL_SALES_MOCK];
const sales = [...mock.SALE_BY_ID_MOCK];
const productsSold = [...mock.PRODUCTS_SOLDS];
const saleCreated = { ...mock.SALE_CREATED };
const itemsUpdate = [...mock.SALE_UPDATE];
const saleUpdated = { ...mock.SALE_UPDATED };
const invalidData = [...mock.INVALID_SALE_DATA];

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
  describe('When the product is not found', () => {
    before(() => {
      sinon.stub(salesModel, 'getById').resolves([]);
    });

    after(() => {
      salesModel.getById.restore();
    });

    it('It should throw an error', async () => {
      const INVALID_ID = 9;

      return expect(salesService.getById(INVALID_ID)).to.eventually
        .rejectedWith('Sale not found')
        .and.be.an.instanceOf(Boom);
    });
  });

  describe('When the product is found', () => {
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
  })
});

describe('TEST CASE SALE SERVICE - When a sale is insert into database', () => {
  describe('When the products id receiveid are invalid', () => {
    before(() => {
      sinon.stub(salesModel, 'create').resolves(saleCreated);
      sinon.stub(productsService, 'getAll').resolves(allProducts);
    });

    after(() => {
      salesModel.create.restore();
      productsService.getAll.restore();
    });

    it('It should throw an error', async () => {
      return expect(salesService.create(invalidData)).to.eventually
        .rejectedWith('Product not found')
        .and.be.an.instanceOf(Boom);
    });
  });

  describe('When the sale is created', () => {
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
});

describe('TEST CASE SALE SERVICE - When a sale is deleted', () => {
  describe('When product is not found', () => {
    before(() => {
      sinon.stub(salesModel, 'deleteSale').resolves(false);
    });

    after(() => {
      salesModel.deleteSale.restore();
    });

    it('It should throw an error', async () => {
      const INVALID_ID = 9;

      return expect(salesService.deleteSale(INVALID_ID)).to.eventually
        .rejectedWith('Sale not found')
        .and.be.an.instanceOf(Boom);
    });
  });

  describe('When sale is deleted', () => {
    before(() => {
      sinon.stub(salesModel, 'deleteSale').resolves(true);
    });
  
    after(() => {
      salesModel.deleteSale.restore();
    }); 
  
    it('It must return true', async () => {
      const result = await salesService.deleteSale(1);
  
      expect(result).to.be.true;
    });
  })
});

describe('TEST CASE SALE SERVICE - When a sale is updated', () => {
  describe('When sale is not found', () => {
    before(() => {
      sinon.stub(salesModel, 'update').resolves(null);
    });
  
    after(() => {
      salesModel.update.restore();
    });

    it('It must throw an error', async () => {
      expect(salesService.update(1, itemsUpdate)).to.eventually
        .rejectedWith('Sale not found')
        .and.be.an.instanceOf(Boom);
    });
  });

  describe('When the products id receiveid are invalid', () => {
    before(() => {
      sinon.stub(salesModel, 'update').resolves(null);
    });
  
    after(() => {
      salesModel.update.restore();
    });

    it('It must throw an error', async () => {
      expect(salesService.update(1, invalidData)).to.eventually
        .rejectedWith('Product not found')
        .and.be.an.instanceOf(Boom);
    });
  });

  describe('When sale is updated', () => {
    beforeEach(() => {
      sinon.stub(salesModel, 'update').resolves(saleUpdated);
    });
  
    afterEach(() => {
      salesModel.update.restore();
    });
  
    it('It must return an object', async () => {
      const result = await salesService.update(1, itemsUpdate);
  
      expect(result).to.be.an('object');
    });
  
    it('The object returned must have "saleId" and "itemsUpdated" keys', async () => {
      const result = await salesService.update(1, itemsUpdate);

      expect(result).to.all.keys('saleId', 'itemsUpdated');
    });

    it('The itemsUpdated key must have an array with the products updated', async () => {
      const { itemsUpdated } = await salesService.update(1, itemsUpdate);

      expect(itemsUpdated).to.eql(itemsUpdate);
    });
  })
});
