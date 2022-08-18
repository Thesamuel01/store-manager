const chai = require('chai')
const chaiAsPromised = require('chai-as-promised');
const { describe } = require('mocha');
const sinon = require('sinon');
const { Boom } = require('@hapi/boom');

// Codigo retirado da documentacao para usar o chai com promises
const expect = chai.expect
chai.use(chaiAsPromised);

const salesService = require('../../../services/salesService');
const testController = require('../../helpers/testController');
const mock = require('../../mocks/sales');

const allSales = [...mock.ALL_SALES_MOCK];
const sales = [...mock.SALE_BY_ID_MOCK];
const productsSold = [...mock.PRODUCTS_SOLDS];
const saleCreated = { ...mock.SALE_CREATED };

describe('TEST CASE SALE CONTROLLER - When search for all products', () => {
  before(() => {
    sinon.stub(salesService, 'getAll').resolves(allSales);
  });

  after(() => {
    salesService.getAll.restore();
  });

  it('It should return code 200', async () => {
    const response = await testController(salesController.getAll);

    expect(response.status).to.be.equal(200);
  });

  it('It should return an array', async () => {
    const response = await testController(salesController.getAll);

    expect(response.spies.json.calledOnce).to.be.true;
    expect(response.body).to.be.an('array');
  });

  it('The array returned can not be empty', async () => {
    const response = await testController(salesController.getAll);

    expect(response.body).to.be.not.empty;
  });

  it('It should return an array of objects', async () => {
    const response = await testController(salesController.getAll);

    expect(response.body[0]).to.be.an('object');
  });

  it('The objects from array must has "saleId", "date", "productId and "quantity" keys', async () => {
    const response = await testController(salesController.getAll);

    expect(response.body[0]).to.all.keys('saleId', 'date', 'productId', 'quantity');
  });
});

describe('TEST CASE SALE CONTROLLER - When search for a specific product', () => {
  describe('When the product is not found', () => {
    before(() => {
      sinon.stub(salesService, 'getById').resolves();
    });

    after(() => {
      salesService.getById.restore();
    });

    it('It should throw an error', async () => {
      return expect(testController(salesController.getById, { params: { id: 8 } })).to.eventually
        .rejectedWith('Salle not found')
        .and.be.an.instanceOf(Boom);
    });
  });

  describe('When the product is found', () => {
    before(() => {
      sinon.stub(salesService, 'getById').resolves(sales);
    });

    after(() => {
      salesService.getById.restore();
    });

    it('It should return code 200', async () => {
      const response = await testController(salesController.getById, { params: { id: 1 } });

      expect(response.status).to.be.equal(200);
    });

    it('It should return an array', async () => {
      const response = await testController(salesController.getById, { params: { id: 1 } });

      expect(response.body).to.be.an('array');
    });

    it('The objects from array must has "saleId", "date", "productId and "quantity" keys', async () => {
      const response = await testController(salesController.getById);

      expect(response.body[0]).to.all.keys('saleId', 'date', 'productId', 'quantity');
    });
  });
});

describe('TEST CASE SALE CONTROLLER - When add a product in database', () => {
  describe('When the product is created', () => {
    before(() => {
      sinon.stub(salesService, 'create').resolves(saleCreated);
    });

    after(() => {
      salesService.create.restore();
    });

    it('It should return code 201', async () => {
      const response = await testController(salesController.create, { body: { name: 'ProductX' } });

      expect(response.status).to.be.equal(201);
    });

    it('It should return an object', async () => {
      const response = await testController(salesController.create, { body: { name: 'ProductX' } });

      expect(response.body).to.be.an('object');
    });

    it('The object returned must have "saleId", "date", "productId and "quantity" keys', async () => {
      const response = await testController(salesController.create, { body: [...productsSold] });

      expect(response.body[0]).to.all.keys('saleId', 'date', 'productId', 'quantity');
    });

    it('The itemsSold key must have an array with the products sold', async () => {
      const response = await testController(salesController.create, { body: [...productsSold] });
      const { itemsSold } = response.body[0]

      expect(itemsSold).to.eql(productsSold);
    });
  });
});
