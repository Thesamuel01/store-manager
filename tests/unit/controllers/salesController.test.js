const chai = require('chai')
const chaiAsPromised = require('chai-as-promised');
const { describe } = require('mocha');
const sinon = require('sinon');
const { Boom } = require('@hapi/boom');

// Codigo retirado da documentacao para usar o chai com promises
const expect = chai.expect
chai.use(chaiAsPromised);

const salesService = require('../../../services/salesService');
const productsService = require('../../../services/productsService');
const salesController = require('../../../controllers/salesController');
const testController = require('../../helpers/testController');
const salesMock = require('../../mocks/sales');
const productsMock = require('../../mocks/products');
const allProducts = [...productsMock.ALL_PRODUCTS_MOCK];

const allSales = [...salesMock.ALL_SALES_MOCK];
const sales = [...salesMock.SALE_BY_ID_MOCK];
const productsSold = [...salesMock.PRODUCTS_SOLDS];
const saleCreated = { ...salesMock.SALE_CREATED };
const invalidData = [...salesMock.INVALID_SALE_DATA];
const itemsUpdate = [...salesMock.SALE_UPDATE];
const saleUpdated = { ...salesMock.SALE_UPDATED };

describe('TEST CASE SALE CONTROLLER - When search for all sale', () => {
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

describe('TEST CASE SALE CONTROLLER - When search for a specific sale', () => {
  describe('When the product is not found', () => {
    before(() => {
      sinon.stub(salesService, 'getById').resolves([]);
    });

    after(() => {
      salesService.getById.restore();
    });

    it('It should throw an error', async () => {
      return expect(testController(salesController.getById, { params: { id: 8 } })).to.eventually
        .rejectedWith('Sale not found')
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

describe('TEST CASE SALE CONTROLLER - When add a sale in database', () => {
  describe('When the products id receiveid are invalid ', () => {
    before(() => {
      sinon.stub(salesService, 'create').resolves(saleCreated);
      sinon.stub(productsService, 'getAll').resolves(allProducts);
    });

    after(() => {
      salesService.create.restore();
      productsService.getAll.restore();
    });

    it('It should throw an error', async () => {
      return expect(testController(salesController.create, { body: invalidData })).to.eventually
        .rejectedWith('Product not found')
        .and.be.an.instanceOf(Boom);
    });
  });
  describe('When the sale is created', () => {
    beforeEach(() => {
      sinon.stub(salesService, 'create').resolves(saleCreated);
      sinon.stub(productsService, 'getAll').resolves(allProducts);
    });

    afterEach(() => {
      salesService.create.restore();
      productsService.getAll.restore();
    });

    it('It should return code 201', async () => {
      const response = await testController(salesController.create, { body: productsSold });

      expect(response.status).to.be.equal(201);
    });

    it('It should return an object', async () => {
      const response = await testController(salesController.create, { body: productsSold });

      expect(response.body).to.be.an('object');
    });

    it('The object returned must have "id" and "itemsSold keys', async () => {
      const response = await testController(salesController.create, { body: productsSold });

      expect(response.body).to.all.keys('id', 'itemsSold');
    });

    it('The itemsSold key must have an array with the products sold', async () => {
      const response = await testController(salesController.create, { body: productsSold });
      const { itemsSold } = response.body;

      expect(itemsSold).to.eql(productsSold);
    });
  });
});

describe('TEST CASE SALE CONTROLLER - When a product is deleted', () => {
  describe('When product is not found', () => {
    const req = {
      params: { id: 9 },
    };

    before(() => {
      sinon.stub(salesService, 'deleteSale').resolves(false);
    });

    after(() => {
      salesService.deleteSale.restore();
    });

    it('It should throw an error', async () => {
      return expect(testController(salesController.deleteSale, req)).to.eventually
        .rejectedWith('Sale not found')
        .and.be.an.instanceOf(Boom);
    });
  });

  describe('When product is deleted', () => {
    const req = {
      params: { id: 1 },
    };
    
    before(() => {
      sinon.stub(salesService, 'deleteSale').resolves(true);
    });
  
    after(() => {
      salesService.deleteSale.restore();
    }); 
  
    it('It must return code 204', async () => {
      const result = await testController(salesController.deleteSale, req);

      expect(result.status).to.be.equal(204);
    });
  })
});

describe('TEST CASE SALE CONTROLLER - When a sale is updated', () => {
  describe('When product is updated', () => {
    const req = {
      params: { id: 1 },
      body: itemsUpdate,
    };
    
    beforeEach(() => {
      sinon.stub(salesService, 'update').resolves(saleUpdated);
    });
  
    afterEach(() => {
      salesService.update.restore();
    }); 
  
    it('It should return code 200', async () => {
      const response = await testController(salesController.update, req);

      expect(response.status).to.be.equal(200);
    });

    it('It should return an object', async () => {
      const response = await testController(salesController.update, req);

      expect(response.body).to.be.an('object');
    });

    it('The object returned must have "saleId" and "itemsUpdated" keys', async () => {
      const response = await testController(salesController.update, req);

      expect(response.body).to.all.keys('saleId', 'itemsUpdated');
    });

    it('The itemsUpdated key must have an array with the products updated', async () => {
      const response = await testController(salesController.update, req);
      const { itemsUpdated } = response.body;

      expect(itemsUpdated).to.eql(itemsUpdate);
    });
  })
});
