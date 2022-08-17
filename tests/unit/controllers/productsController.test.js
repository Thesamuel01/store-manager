const chai = require('chai')
const chaiAsPromised = require('chai-as-promised');
const { describe } = require('mocha');
const sinon = require('sinon');
const { Boom } = require('@hapi/boom');

// Codigo retirado da documentacao para usar o chai com promises
const expect = chai.expect
chai.use(chaiAsPromised);

const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');
const testController = require('../../helpers/testController');

describe('TEST CASE PRODUCT CONTROLLER - When search for all products', () => {
  before(() => {
    sinon.stub(productsService, 'getAll').resolves([{ id: 1, name: 'Martelo do Thor' }]);
  });

  after(() => {
    productsService.getAll.restore();
  });

  it('It should return code 200', async () => {
    const result = await testController(productsController.getAll);

    expect(result.status).to.be.equal(200);
  });

  it('It should return an array', async () => {
    const result = await testController(productsController.getAll);

    expect(result.spies.json.calledOnce).to.be.true;
    expect(result.body).to.be.an('array');
  });

  it('The array returned can not be empty', async () => {
    const result = await testController(productsController.getAll);

    expect(result.body).to.be.not.empty;
  });

  it('It should return an array of objects', async () => {
    const result = await testController(productsController.getAll);

    expect(result.body[0]).to.be.an('object');
  });

  it('The objects from array must has "id" and "name" keys', async () => {
    const result = await testController(productsController.getAll);

    expect(result.body[0]).to.all.keys('id', 'name');
  })
});

describe('TEST CASE PRODUCT CONTROLLER - When search for a specific product', () => {
  describe('When the product is not found', () => {
    before(() => {
      sinon.stub(productsService, 'getById').resolves();
    });

    after(() => {
      productsService.getById.restore();
    });

    it('It should throw an error', async () => {
      return expect(testController(productsController.getById, { params: { id: 8 } })).to.eventually
        .rejectedWith('Product not found')
        .and.be.an.instanceOf(Boom);
    });
  });

  describe('TEST CASE PRODUCT CONTROLLER - When the product is found', () => {
    before(() => {
      const executeResult = { id: 1, name: 'Martelo do Thor' };

      sinon.stub(productsService, 'getById').resolves(executeResult);
    });

    after(() => {
      productsService.getById.restore();
    });

    it('It should return code 200', async () => {
      const result = await testController(productsController.getById, { params: { id: 1 } });

      expect(result.status).to.be.equal(200);
    });

    it('It should return an object', async () => {
      const result = await testController(productsController.getById, { params: { id: 1 } });

      expect(result.body).to.be.an('object');
    });

    it('The objects returned must has "id" and "name" keys', async () => {
      const result = await testController(productsController.getById, { params: { id: 1 } });

      expect(result.body).to.all.keys('id', 'name');
    })
  });
});

describe('TEST CASE PRODUCT CONTROLLER - When add a product in database', () => {
  describe('TEST CASE PRODUCT CONTROLLER - When the product is created', () => {
    const productCreated = { id: 4, name: 'ProdutoX' };

    before(() => {
      sinon.stub(productsService, 'create').resolves(productCreated);
    });

    after(() => {
      productsService.create.restore();
    });

    it('It should return code 201', async () => {
      const result = await testController(productsController.create, { body: { name: 'ProductX' } });

      expect(result.status).to.be.equal(201);
    });

    it('It should return an object', async () => {
      const result = await testController(productsController.create, { body: { name: 'ProductX' } });

      expect(result.body).to.be.an('object');
    });

    it('The objects returned must has "id" and "name" keys', async () => {
      const result = await testController(productsController.create, { body: { name: 'ProductX' } });

      expect(result.body).to.all.keys('id', 'name');
    })

    it('The object returned should have infos about the product created', async () => {
      const result = await testController(productsController.create, { body: { name: 'ProductX' } });

      expect(result.body.id).to.be.equal(productCreated.id);
      expect(result.body.name).to.be.equal(productCreated.name);
    });
  });
});
