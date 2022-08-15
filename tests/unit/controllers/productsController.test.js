const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');

const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');

describe('TEST CASE PRODUCT CONTROLLER - When search for all products', () => {
  const response = {};
  const request = {
    params: {
      id: 1,
    }
  };

  before(() => {
    const executeResult = [{ id: 1, name: 'Martelo do Thor' }];

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    sinon.stub(productsService, 'getAll').resolves(executeResult);
  });

  after(() => {
    productsService.getAll.restore();
  });

  it('It should return code 200', async () => {
    await productsController.getAll(request, response);

    expect(response.status.calledWith(200)).to.be.equal(true);
  });

  it('It should return an array', async () => {
    await productsController.getAll(request, response);

    expect(response.json.calledWith([{ id: 1, name: 'Martelo do Thor' }])).to.be.equal(true);
    expect(response.json.args[0][0]).to.be.an('array');
  });

  it('The array returned can not be empty', async () => {
    await productsController.getAll(request, response);

    expect(response.json.args[0][0]).to.be.not.empty;
  });

  it('It should return an array of objects', async () => {
    await productsController.getAll(request, response);


    expect(response.json.args[0][0][0]).to.be.an('object');
  });

  it('The objects from array must has "id" and "name" keys', async () => {
    await productsController.getAll(request, response);

    expect(response.json.args[0][0][0]).to.all.keys('id', 'name');
  })
});

describe('TEST CASE PRODUCT CONTROLLER - When search for a specific product', () => {
  const response = {};
  const request = {
    params: {
      id: 8,
    }
  };

  describe('When the product is not found', () => {
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsService, 'getById').resolves();
    });

    after(() => {
      productsService.getById.restore();
    });

    it('It should return code 404', async () => {
      await productsController.getById(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('It should return an object', async () => {
      await productsController.getById(request, response);


      expect(response.json.args[0][0]).to.be.an('object');
    });

    it('The objects returned must has a message', async () => {
      await productsController.getById(request, response);

      expect(response.json.args[0][0]).to.all.keys('message');
      expect(response.json.args[0][0].message).to.be.equal('Product not found');
    })
  });

  describe('When the product is found', () => {
    before(() => {
      const executeResult = { id: 1, name: 'Martelo do Thor' };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsService, 'getById').resolves(executeResult);
    });

    after(() => {
      productsService.getById.restore();
    });

    it('It should return code 200', async () => {
      await productsController.getById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('It should return an object', async () => {
      await productsController.getById(request, response);


      expect(response.json.args[0][0]).to.be.an('object');
    });

    it('The objects returned must has "id" and "name" keys', async () => {
      await productsController.getById(request, response);

      expect(response.json.args[0][0]).to.all.keys('id', 'name');
    })
  });
});
