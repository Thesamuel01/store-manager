const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');

const productsService = require('../../../services/productsService');
// const productsService = require('../../../controllers');

const productsController = {
  getAll: (req, res) => {},
}

describe('When search for all products', () => {
  const response = {};
  const request = {};

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

    // expect(response.status.calledWith(200)).to.be.equal(true);
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
