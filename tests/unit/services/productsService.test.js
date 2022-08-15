const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');

const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');

describe('TEST CASE PRODUCT SERVICE - When search for all products', () => {
  before(() => {
    const executeResult = [{ id: 1, name: 'Martelo do Thor' }];

    sinon.stub(productsModel, 'getAll').resolves(executeResult);
  });

  after(() => {
    productsModel.getAll.restore();
  });

  it('It should return an array', async () => {
    const result = await productsService.getAll();

    expect(result).to.be.an('array');
  });

  it('The array returned can not be empty', async () => {
    const result = await productsService.getAll();

    expect(result).to.be.not.empty;
  });

  it('It should return an array of objects', async () => {
    const result = await productsService.getAll();
    const item = result[0];

    expect(item).to.be.an('object');
  });

  it('The objects from array must has "id" and "name" keys', async () => {
    const result = await productsService.getAll();
    const item = result[0];

    expect(item).to.all.keys('id', 'name');
  })
});

describe('TEST CASE PRODUCT SERVICE - When search for a specific product', () => {
  const ID = 1;

  before(() => {
    const executeResult = { id: 1, name: 'Martelo do Thor' };

    sinon.stub(productsModel, 'getById').resolves(executeResult);
  });

  after(() => {
    productsModel.getById.restore();
  });

  it('It should return an object', async () => {
    const result = await productsService.getById(ID);

    expect(result).to.be.an('object');
  });

  it('The object returned must have "id" and "name" keys', async () => {
    const result = await productsService.getById(ID);

    expect(result).to.all.keys('id', 'name');
  });

  it('The product id must be equal to id pass by parameter', async () => {
    const result = await productsService.getById(ID);
    const { id } = result;

    expect(id).to.be.equal(ID);
  })
});